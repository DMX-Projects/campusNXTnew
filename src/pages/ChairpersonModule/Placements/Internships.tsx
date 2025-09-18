// pages/Internships.tsx
import React, { useState } from "react";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  type: string;
  mode: string;
  posted: string;
  deadline: string;
  applicants: number;
  selected: number;
  status: string;
  description: string;
  requirements: string[];
}

interface Application {
  id: number;
  studentName: string;
  rollNumber: string;
  internshipTitle: string;
  company: string;
  appliedDate: string;
  status: string;
  interview?: string;
}

const Internships: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "applications" | "all">("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // ---- Sample Data ----
  const internships: Internship[] = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TCS",
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹25,000/month",
      type: "Full-time",
      mode: "Hybrid",
      posted: "2025-08-28",
      deadline: "2025-09-15",
      applicants: 45,
      selected: 8,
      status: "active",
      description:
        "Work on cutting-edge software projects with our development team.",
      requirements: ["React.js", "Node.js", "JavaScript", "Git"],
    },
    {
      id: 2,
      title: "Data Analytics Intern",
      company: "Infosys",
      location: "Pune",
      duration: "4 months",
      stipend: "₹20,000/month",
      type: "Full-time",
      mode: "Remote",
      posted: "2025-08-25",
      deadline: "2025-09-10",
      applicants: 67,
      selected: 12,
      status: "active",
      description:
        "Analyze large datasets and create meaningful insights for business decisions.",
      requirements: ["Python", "SQL", "Excel", "PowerBI"],
    },
  ];

  const applications: Application[] = [
    {
      id: 1,
      studentName: "Rahul Sharma",
      rollNumber: "CS21001",
      internshipTitle: "Software Development Intern",
      company: "TCS",
      appliedDate: "2025-08-29",
      status: "selected",
      interview: "2025-09-05",
    },
  ];

  // ---- Stats Cards ----
  const stats = [
    { name: "Total Internships", value: internships.length, icon: BriefcaseIcon, color: "bg-indigo-500" },
    { name: "Total Applicants", value: applications.length, icon: UserGroupIcon, color: "bg-green-500" },
    { name: "Active Internships", value: internships.filter(i => i.status === "active").length, icon: ClockIcon, color: "bg-yellow-500" },
    { name: "Completed Internships", value: internships.filter(i => i.status === "completed").length, icon: BuildingOfficeIcon, color: "bg-gray-500" },
  ];

  // ---- Helpers ----
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "selected":
        return "bg-green-100 text-green-800";
      case "shortlisted":
        return "bg-yellow-100 text-yellow-800";
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || internship.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Internships</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Post Internship</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option>All Locations</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Hyderabad</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option>All Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: "active", label: "Active Internships" },
              { key: "completed", label: "Completed" },
              { key: "applications", label: "Applications" },
              { key: "all", label: "All Internships" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Internships View */}
          {activeTab !== "applications" && (
            <div className="space-y-6">
              {filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            internship.status
                          )}`}
                        >
                          {internship.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                          {internship.company}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="w-4 h-4 mr-2" />
                          {internship.location} ({internship.mode})
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          {internship.duration}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                          {internship.stipend}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{internship.description}</p>

                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-700">Requirements: </span>
                        <div className="inline-flex flex-wrap gap-1 mt-1">
                          {internship.requirements.map((req, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div>Posted: {internship.posted}</div>
                        <div>Deadline: {internship.deadline}</div>
                        <div>Applicants: {internship.applicants}</div>
                        <div>Selected: {internship.selected}</div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => {
                          setSelectedInternship(internship);
                          setShowDetailsModal(true);
                        }}
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>

                      <button
                        className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
                        onClick={() => {
                          setSelectedInternship(internship);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Applications View */}
          {activeTab === "applications" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Internship</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interview</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                          <div className="text-sm text-gray-500">{application.rollNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{application.internshipTitle}</div>
                        <div className="text-sm text-gray-500">{application.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.appliedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getApplicationStatusColor(application.status)}`}>
                          {application.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.interview || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowProfileModal(true);
                          }}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {/* Details Modal */}
      {showDetailsModal && selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{selectedInternship.title}</h2>
            <p className="mb-2"><strong>Company:</strong> {selectedInternship.company}</p>
            <p className="mb-2"><strong>Location:</strong> {selectedInternship.location} ({selectedInternship.mode})</p>
            <p className="mb-2"><strong>Duration:</strong> {selectedInternship.duration}</p>
            <p className="mb-2"><strong>Stipend:</strong> {selectedInternship.stipend}</p>
            <p className="mb-2"><strong>Description:</strong> {selectedInternship.description}</p>
            <p className="mb-2"><strong>Requirements:</strong> {selectedInternship.requirements.join(", ")}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedInternship && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Edit Internship</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: Update the internship in your internships array or API
          setShowEditModal(false);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue={selectedInternship.title}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue={selectedInternship.company}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue={selectedInternship.location}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue={selectedInternship.duration}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stipend</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue={selectedInternship.stipend}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue={selectedInternship.type}
            >
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue={selectedInternship.mode}
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue={selectedInternship.deadline}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            defaultValue={selectedInternship.description}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            defaultValue={selectedInternship.requirements.join(", ")}
            placeholder="Separate multiple requirements with commas"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Profile Modal */}
      {showProfileModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedApplication.studentName} ({selectedApplication.rollNumber})</h2>
            <p className="mb-2"><strong>Internship:</strong> {selectedApplication.internshipTitle}</p>
            <p className="mb-2"><strong>Company:</strong> {selectedApplication.company}</p>
            <p className="mb-2"><strong>Applied Date:</strong> {selectedApplication.appliedDate}</p>
            <p className="mb-2"><strong>Status:</strong> {selectedApplication.status}</p>
            <p className="mb-2"><strong>Interview:</strong> {selectedApplication.interview || "-"}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowProfileModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Internship Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Post New Internship</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Internship Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Software Development Intern"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 6 months"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stipend</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., ₹25,000/month"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option>Full-time</option>
                    <option>Part-time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option>On-site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe the internship responsibilities and learning opportunities..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="List required skills and qualifications..."
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  Post Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;
