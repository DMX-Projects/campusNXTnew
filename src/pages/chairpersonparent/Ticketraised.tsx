
import React, { useState } from "react";

type Ticket = {
  id: number;
  title: string;
  parentName: string;
  studentName: string;
  rollNumber: string;
  department: string;
  year: string;
  section: string;
  classroom: string;
  batch: string;
  priority: string;
  status: string;
  problems: string[];
  category: string;
  createdDate: string;
  assignedTo: string;
  resolutionNotes: string;
};

export default function ViewTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: "Hostel Mess Food Quality",
      parentName: "Mr. Ramesh",
      studentName: "Akhil Ramesh",
      rollNumber: "21CSE001",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      section: "A",
      classroom: "CSE - A",
      batch: "2021-2025",
      priority: "High",
      status: "Open",
      problems: [
        "Poor food quality in hostel mess",
        "Unhygienic kitchen environment",
      ],
      category: "Hostel",
      createdDate: "2025-09-01",
      assignedTo: "Hostel Warden",
      resolutionNotes: "",
    },
    {
      id: 2,
      title: "Transport Bus Delay",
      parentName: "Mrs. Priya",
      studentName: "Anjali Priya",
      rollNumber: "20ECE045",
      department: "Electronics & Communication Engineering",
      year: "4th Year",
      section: "B",
      classroom: "ECE - B",
      batch: "2020-2024",
      priority: "Medium",
      status: "In Progress",
      problems: [
        "College bus consistently late by 20–30 minutes",
        "Affects morning class attendance",
      ],
      category: "Transport",
      createdDate: "2025-08-28",
      assignedTo: "Transport Manager",
      resolutionNotes: "Bus route adjusted, monitoring delays",
    },
    {
      id: 3,
      title: "Library Books Shortage",
      parentName: "Mr. Suresh",
      studentName: "Rahul Suresh",
      rollNumber: "19MECH012",
      department: "Mechanical Engineering",
      year: "Final Year",
      section: "C",
      classroom: "MECH - C",
      batch: "2019-2023",
      priority: "Low",
      status: "Resolved",
      problems: [
        "Not enough reference books for project",
        "Delay in new book procurement",
      ],
      category: "Library",
      createdDate: "2025-08-20",
      assignedTo: "Librarian",
      resolutionNotes: "New books ordered and digital access provided",
    },
  ]);

  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResolutionNotes, setNewResolutionNotes] = useState("");

  const handleStatusChange = (id: number, newStatus: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleOpenModal = (ticket: Ticket) => {
    setActiveTicket(ticket);
    setNewResolutionNotes(ticket.resolutionNotes);
    setIsModalOpen(true);
  };

  const handleSaveResolution = () => {
    if (activeTicket) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === activeTicket.id
            ? { ...t, resolutionNotes: newResolutionNotes }
            : t
        )
      );
    }
    setIsModalOpen(false);
    setActiveTicket(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveTicket(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-800">
        Parent Raised Tickets
      </h2>

      {/* Desktop/Tablet Table - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">#</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Title</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Parent</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Student</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Roll No</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Department</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Priority</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Created</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Assigned To</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                <td className="p-3 text-sm border-b">{ticket.id}</td>
                <td className="p-3 text-sm border-b font-medium text-gray-900">{ticket.title}</td>
                <td className="p-3 text-sm border-b text-gray-700">{ticket.parentName}</td>
                <td className="p-3 text-sm border-b text-gray-700">{ticket.studentName}</td>
                <td className="p-3 text-sm border-b text-gray-700 font-mono">{ticket.rollNumber}</td>
                <td className="p-3 text-sm border-b text-gray-700">{ticket.department}</td>
                <td className="p-3 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-3 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="p-3 text-sm border-b text-gray-700">{ticket.createdDate}</td>
                <td className="p-3 text-sm border-b text-gray-700">{ticket.assignedTo}</td>
                <td className="p-3 border-b text-center">
                  <button
                    onClick={() => handleOpenModal(ticket)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet Card View */}
      <div className="hidden sm:block lg:hidden">
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                <div>
                  <p><span className="font-medium text-gray-800">Parent:</span> {ticket.parentName}</p>
                  <p><span className="font-medium text-gray-800">Student:</span> {ticket.studentName}</p>
                  <p><span className="font-medium text-gray-800">Roll No:</span> {ticket.rollNumber}</p>
                </div>
                <div>
                  <p><span className="font-medium text-gray-800">Department:</span> {ticket.department}</p>
                  <p><span className="font-medium text-gray-800">Created:</span> {ticket.createdDate}</p>
                  <p><span className="font-medium text-gray-800">Assigned:</span> {ticket.assignedTo}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  Priority: {ticket.priority}
                </span>
                <button
                  onClick={() => handleOpenModal(ticket)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold text-gray-900 pr-2">{ticket.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><span className="font-medium text-gray-800">Parent:</span> {ticket.parentName}</p>
                <p><span className="font-medium text-gray-800">Student:</span> {ticket.studentName}</p>
                <p><span className="font-medium text-gray-800">Roll No:</span> {ticket.rollNumber}</p>
                <p><span className="font-medium text-gray-800">Department:</span> {ticket.department}</p>
                <p><span className="font-medium text-gray-800">Created:</span> {ticket.createdDate}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <button
                  onClick={() => handleOpenModal(ticket)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && activeTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start p-4 z-50">
          <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full mt-8 mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Ticket Details</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Title</span>
                    <p className="text-lg font-semibold text-gray-900">{activeTicket.title}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Parent Name</span>
                    <p className="text-gray-800">{activeTicket.parentName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Student Name</span>
                    <p className="text-gray-800">{activeTicket.studentName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Roll Number</span>
                    <p className="text-gray-800 font-mono">{activeTicket.rollNumber}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Department</span>
                    <p className="text-gray-800">{activeTicket.department}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Priority</span>
                    <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(activeTicket.priority)}`}>
                      {activeTicket.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(activeTicket.status)}`}>
                        {activeTicket.status}
                      </span>
                      <select
                        value={activeTicket.status}
                        onChange={(e) => handleStatusChange(activeTicket.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Assigned To</span>
                    <p className="text-gray-800">{activeTicket.assignedTo}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500">Problems Reported</span>
                <ul className="mt-2 space-y-1">
                  {activeTicket.problems.map((problem, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-800">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Notes
                </label>
                <textarea
                  rows={4}
                  value={newResolutionNotes}
                  onChange={(e) => setNewResolutionNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter resolution details or updates..."
                />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveResolution}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Resolution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}