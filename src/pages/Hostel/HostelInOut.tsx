import React, { useState } from "react";
import { Search, UserPlus, Clock, Home, User, Hash, MapPin, Calendar, FileText, Trash2, Edit3 } from "lucide-react";

interface InOutRecord {
  id: number;
  name: string;
  rollNo: string;
  roomNo: string;
  outTime: string;
  inTime: string;
  reason: string;
}

const HostelInOut: React.FC = () => {
  // Sample initial data for demonstration
  const [records, setRecords] = useState<InOutRecord[]>([
    {
      id: 1,
      name: "Arjun Sharma",
      rollNo: "CS21001",
      roomNo: "A-201",
      outTime: "2025-08-28T10:30",
      inTime: "2025-08-28T18:45",
      reason: "Medical checkup"
    },
    {
      id: 2,
      name: "Priya Patel",
      rollNo: "ME21045",
      roomNo: "B-103",
      outTime: "2025-08-28T14:15",
      inTime: "",
      reason: "Family visit"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    roomNo: "",
    outTime: "",
    inTime: "",
    reason: "",
  });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.rollNo || !formData.roomNo) {
      alert("Please fill required fields!");
      return;
    }

    if (editingId) {
      // Update existing record
      setRecords(prev => prev.map(r => 
        r.id === editingId 
          ? { ...r, ...formData, name: formData.name.trim(), rollNo: formData.rollNo.trim(), roomNo: formData.roomNo.trim(), reason: formData.reason.trim() }
          : r
      ));
      setEditingId(null);
    } else {
      // Add new record
      const newRecord: InOutRecord = {
        id: Date.now(),
        name: formData.name.trim(),
        rollNo: formData.rollNo.trim(),
        roomNo: formData.roomNo.trim(),
        outTime: formData.outTime,
        inTime: formData.inTime,
        reason: formData.reason.trim(),
      };
      setRecords((prev) => [...prev, newRecord]);
    }

    setFormData({
      name: "",
      rollNo: "",
      roomNo: "",
      outTime: "",
      inTime: "",
      reason: "",
    });
  };

  const handleEdit = (record: InOutRecord) => {
    setFormData({
      name: record.name,
      rollNo: record.rollNo,
      roomNo: record.roomNo,
      outTime: record.outTime,
      inTime: record.inTime,
      reason: record.reason,
    });
    setEditingId(record.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      rollNo: "",
      roomNo: "",
      outTime: "",
      inTime: "",
      reason: "",
    });
  };

  const filteredRecords = records.filter((r) =>
    [r.name, r.rollNo, r.roomNo].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return "-";
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const getStatusBadge = (outTime: string, inTime: string) => {
    if (!outTime) return null;
    if (!inTime) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Out</span>;
    }
    return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Returned</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Home className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Hostel Management System
          </h1>
          <p className="text-gray-600 text-lg">Track student in/out records efficiently</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, roll number, or room..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Add/Edit Record Form */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                {editingId ? <Edit3 className="w-5 h-5 text-indigo-600" /> : <UserPlus className="w-5 h-5 text-indigo-600" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? "Edit Record" : "Add New Record"}
              </h2>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="ml-auto px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Student Name *"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="rollNo"
                    placeholder="Roll Number *"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="roomNo"
                    placeholder="Room Number *"
                    value={formData.roomNo}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="datetime-local"
                    name="outTime"
                    value={formData.outTime}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  />
                  <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-600">Out Time</label>
                </div>

                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="datetime-local"
                    name="inTime"
                    value={formData.inTime}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  />
                  <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-600">In Time</label>
                </div>
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="reason"
                  placeholder="Reason for going out"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {editingId ? "Update Record" : "Add Record"}
              </button>
            </div>
          </div>
        </div>

        {/* Records Display */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                In/Out Records ({filteredRecords.length})
              </h3>
            </div>

            {filteredRecords.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No records found</p>
                <p className="text-gray-400 text-sm mt-2">Add some records to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Room</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Out Time</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">In Time</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-indigo-50/50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900">{record.name}</div>
                            <div className="text-sm text-gray-500">{record.rollNo}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {record.roomNo}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDateTime(record.outTime)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDateTime(record.inTime)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {record.reason || "-"}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(record.outTime, record.inTime)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(record)}
                              className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors duration-150"
                              title="Edit record"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(record.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-150"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelInOut;