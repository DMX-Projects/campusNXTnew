import React, { useState } from "react";
import {
  Calendar,
  Clock,
  FileText,
  Edit2,
  Trash2,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

type LeaveStatus = "Pending" | "Approved" | "Rejected";

interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  leaveType: string;
  description?: string;
  status: LeaveStatus;
  submittedDate: string;
}

const leaveTypes = [
  "Personal",
  "Medical",
  "Conference",
  "Competition",
  "Workshop",
  "Seminar",
  "Research Presentation",
  "Other",
];

function getStatusBadge(status: LeaveStatus) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Approved: "bg-green-100 text-green-800 border-green-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
  };
  const icons = {
    Pending: <Clock className="w-4 h-4" />,
    Approved: <CheckCircle className="w-4 h-4" />,
    Rejected: <XCircle className="w-4 h-4" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

export default function HodLeaveRequest() {
  const [leaveHistory, setLeaveHistory] = useState<LeaveRequest[]>([
    {
      id: 1,
      startDate: "2025-03-15",
      endDate: "2025-03-17",
      reason: "IEEE Conference Presentation",
      leaveType: "Conference",
      status: "Approved",
      submittedDate: "2025-03-10",
    },
    {
      id: 2,
      startDate: "2025-04-20",
      endDate: "2025-04-20",
      reason: "Personal leave for family emergency",
      leaveType: "Personal",
      status: "Pending",
      submittedDate: "2025-04-15",
    },
    {
      id: 3,
      startDate: "2025-02-28",
      endDate: "2025-03-01",
      reason: "Medical leave",
      leaveType: "Medical",
      status: "Rejected",
      submittedDate: "2025-02-20",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterLeaveType, setFilterLeaveType] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    leaveType: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredRequests = leaveHistory.filter((r) => {
    const statusMatch = filterStatus ? r.status === filterStatus : true;
    const typeMatch = filterLeaveType ? r.leaveType === filterLeaveType : true;
    return statusMatch && typeMatch;
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    if (!formData.leaveType) newErrors.leaveType = "Leave type is required";

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    if (formData.reason.length > 500) {
      newErrors.reason = "Reason must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newRequest: LeaveRequest = editingRequest
        ? { ...editingRequest, ...formData }
        : {
            id: Date.now(),
            ...formData,
            status: "Pending",
            submittedDate: new Date().toISOString().split("T")[0],
          };

      setLeaveHistory((prev) =>
        editingRequest
          ? prev.map((r) => (r.id === editingRequest.id ? newRequest : r))
          : [newRequest, ...prev]
      );

      setIsSubmitting(false);
      setFormVisible(false);
      setEditingRequest(null);
      setFormData({ startDate: "", endDate: "", reason: "", leaveType: "", description: "" });
    }, 1000);
  };

  const handleEdit = (request: LeaveRequest) => {
    if (request.status !== "Pending") return;
    setEditingRequest(request);
    setFormData({
      startDate: request.startDate,
      endDate: request.endDate,
      reason: request.reason,
      leaveType: request.leaveType,
      description: request.description || "",
    });
    setFormVisible(true);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setLeaveHistory((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">HOD Leave Request Management</h1>
        <div className="flex flex-wrap justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-4">
            <select
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800"
              value={filterLeaveType}
              onChange={(e) => setFilterLeaveType(e.target.value)}
              aria-label="Filter by leave type"
            >
              <option value="">All Leave Types</option>
              {leaveTypes.map((lt) => (
                <option key={lt} value={lt}>
                  {lt}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setFormVisible(!formVisible);
              setEditingRequest(null);
              setFormData({ startDate: "", endDate: "", reason: "", leaveType: "", description: "" });
              setErrors({});
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            <Plus className="w-4 h-4" />
            {formVisible ? "Cancel" : "Raise Request"}
          </button>
        </div>

        {formVisible && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-6 border border-gray-300 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <label htmlFor="startDate" className="block mb-1 font-semibold">
                  Start Date*
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full border rounded p-2 ${
                    errors.startDate ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="endDate" className="block mb-1 font-semibold">
                  End Date*
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={`w-full border rounded p-2 ${
                    errors.endDate ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.endDate && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.endDate}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="leaveType" className="block mb-1 font-semibold">
                  Leave Type*
                </label>
                <select
                  id="leaveType"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className={`w-full border rounded p-2 ${
                    errors.leaveType ? "border-red-600" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Select --</option>
                  {leaveTypes.map((lt) => (
                    <option key={lt} value={lt}>
                      {lt}
                    </option>
                  ))}
                </select>
                {errors.leaveType && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.leaveType}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="reason" className="block mb-1 font-semibold">
                  Reason*
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={handleInputChange}
                  className={`w-full border rounded p-2 ${
                    errors.reason ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.reason && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.reason}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block mb-1 font-semibold">
                  Additional Information (optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="md:col-span-2 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setFormVisible(false);
                    setEditingRequest(null);
                    setFormData({ startDate: "", endDate: "", reason: "", leaveType: "", description: "" });
                    setErrors({});
                  }}
                  className="mr-4 px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isSubmitting ? "Submitting..." : editingRequest ? "Save Changes" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td className="p-4 text-center italic" colSpan={6}>
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="border px-4 py-2">{request.startDate}</td>
                    <td className="border px-4 py-2">{request.endDate}</td>
                    <td className="border px-4 py-2 max-w-xs truncate" title={request.reason}>
                      {request.reason}
                    </td>
                    <td className="border px-4 py-2">{request.leaveType}</td>
                    <td className="border px-4 py-2">{getStatusBadge(request.status)}</td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      {request.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleEdit(request)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            aria-label={`Edit leave request ${request.id}`}
                          >
                            <Edit2 className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(request.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            aria-label={`Delete leave request ${request.id}`}
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </>
                      ) : (
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-400 text-white rounded cursor-not-allowed"
                          disabled
                        >
                          <Eye className="w-4 h-4" /> View
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
