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

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    leaveType: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRequest, setEditingRequest] = useState<any>(null);
  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: 1,
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      reason: "IEEE Conference Presentation",
      leaveType: "Conference",
      status: "Approved",
      remarks: "Good luck with presentation",
      submittedDate: "2024-03-10",
    },
    {
      id: 2,
      startDate: "2024-04-20",
      endDate: "2024-04-20",
      reason: "Technical Paper Competition",
      leaveType: "Competition",
      status: "Pending",
      remarks: "",
      submittedDate: "2024-04-15",
    },
    {
      id: 3,
      startDate: "2024-02-28",
      endDate: "2024-03-01",
      reason: "Workshop on AI/ML",
      leaveType: "Workshop",
      status: "Rejected",
      remarks: "Clashes with exam schedule",
      submittedDate: "2024-02-20",
    },
  ]);

  const leaveTypes = [
    "Conference",
    "Competition",
    "Workshop",
    "Seminar",
    "Research Presentation",
    "Other",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newRequest = {
        id: editingRequest ? editingRequest.id : Date.now(),
        ...formData,
        status: "Pending",
        remarks: "",
        submittedDate: new Date().toISOString().split("T")[0],
      };

      if (editingRequest) {
        setLeaveHistory((prev) =>
          prev.map((item) => (item.id === editingRequest.id ? newRequest : item))
        );
      } else {
        setLeaveHistory((prev) => [newRequest, ...prev]);
      }

      setFormData({
        startDate: "",
        endDate: "",
        reason: "",
        leaveType: "",
        description: "",
      });
      setShowForm(false);
      setEditingRequest(null);
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (request: any) => {
    if (request.status !== "Pending") return;
    setFormData({
      startDate: request.startDate,
      endDate: request.endDate,
      reason: request.reason,
      leaveType: request.leaveType,
      description: request.description || "",
    });
    setEditingRequest(request);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setLeaveHistory((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Approved: "bg-green-100 text-green-800 border-green-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    };

    const icons: Record<string, JSX.Element> = {
      Pending: <Clock className="w-4 h-4" />,
      Approved: <CheckCircle className="w-4 h-4" />,
      Rejected: <XCircle className="w-4 h-4" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Leave Request Management
          </h1>
         
        </div>

        {/* New Request Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(true);
              setEditingRequest(null);
              setFormData({
                startDate: "",
                endDate: "",
                reason: "",
                leaveType: "",
                description: "",
              });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            New Leave Request
          </button>
        </div>

        {/* Modal form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
              <button
                aria-label="Close modal"
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-3xl font-extrabold"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                {editingRequest ? "Edit Leave Request" : "Submit New Leave Request"}
              </h2>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Date range */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`w-full rounded px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-gray-100 dark:border-slate-700 ${
                        errors.startDate ? "border-red-600" : "border-gray-300"
                      }`}
                    />
                    {errors.startDate && (
                      <p className="flex gap-1 text-red-600 items-center mt-1 text-sm">
                        <AlertCircle className="w-4 h-4" /> {errors.startDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className={`w-full rounded px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-gray-100 dark:border-slate-700 ${
                        errors.endDate ? "border-red-600" : "border-gray-300"
                      }`}
                    />
                    {errors.endDate && (
                      <p className="flex gap-1 text-red-600 items-center mt-1 text-sm">
                        <AlertCircle className="w-4 h-4" /> {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Leave Type */}
                <div>
                  <label htmlFor="leaveType" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type of Leave *
                  </label>
                  <select
                    id="leaveType"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                    className={`w-full rounded px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-gray-100 dark:border-slate-700 ${
                      errors.leaveType ? "border-red-600" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select leave type...</option>
                    {leaveTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.leaveType && (
                    <p className="flex gap-1 text-red-600 items-center mt-1 text-sm">
                      <AlertCircle className="w-4 h-4" /> {errors.leaveType}
                    </p>
                  )}
                </div>

                {/* Reason */}
                <div>
                  <label htmlFor="reason" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason for Leave *
                  </label>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    placeholder="e.g., IEEE International Conference"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className={`w-full rounded px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-gray-100 dark:border-slate-700 ${
                      errors.reason ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                  {errors.reason && (
                    <p className="flex gap-1 text-red-600 items-center mt-1 text-sm">
                      <AlertCircle className="w-4 h-4" /> {errors.reason}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    placeholder="Any additional information..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full rounded px-4 py-2 border border-gray-300 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        {editingRequest ? "Update Request" : "Submit Request"}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingRequest(null);
                      setFormData({
                        startDate: "",
                        endDate: "",
                        reason: "",
                        leaveType: "",
                        description: "",
                      });
                    }}
                    className="px-6 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Leave History Table */}
        <div className=" rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <h2 className="text-xl font-semibold dark:text-white">Leave Request History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
        <thead className="bg-slate-100 dark:bg-slate-700">
               <tr>
    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-200">
      Dates
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-200">
      Type
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-200">
      Reason
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-200">
      Status
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-200">
      Remarks
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-200">
      Actions
    </th>
  </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {leaveHistory.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white flex gap-2 items-center">
                      <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <div>
                        <div>{new Date(request.startDate).toLocaleDateString()}</div>
                        {request.startDate !== request.endDate && (
                          <div className="text-gray-500 dark:text-gray-400">
                            to {new Date(request.endDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {request.leaveType}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-gray-900 dark:text-white">
                      {request.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-gray-600 dark:text-gray-400">
                      {request.remarks || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {request.status === "Pending" ? (
                          <>
                            <button
                              onClick={() => handleEdit(request)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                              title="Edit request"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(request.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                              title="Delete request"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            className="text-gray-400 cursor-not-allowed"
                            disabled
                            title="Cannot edit processed requests"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
