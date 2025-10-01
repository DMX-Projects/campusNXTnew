import { useState } from "react";

type LeaveRequest = {
  id: number;
  fromDate: string;
  toDate: string;
  type: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  hodNote?: string;
};

export default function LeaveRequest() {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      fromDate: "2025-09-10",
      toDate: "2025-09-12",
      type: "Casual Leave",
      reason: "Family function",
      status: "Approved",
      hodNote: "Approved, ensure classes are adjusted",
    },
    {
      id: 2,
      fromDate: "2025-09-15",
      toDate: "2025-09-15",
      type: "Sick Leave",
      reason: "Fever",
      status: "Pending",
    },
  ]);

  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    type: "Casual Leave",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fromDate || !form.toDate || !form.reason) {
      alert("Please fill all required fields");
      return;
    }
    const newRequest: LeaveRequest = {
      id: requests.length + 1,
      fromDate: form.fromDate,
      toDate: form.toDate,
      type: form.type,
      reason: form.reason,
      status: "Pending",
    };
    setRequests((prev) => [newRequest, ...prev]);
    setForm({ fromDate: "", toDate: "", type: "Casual Leave", reason: "" });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Faculty Leave Request</h2>

      {/* Leave Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6"
      >
        <div className="mb-4 grid gap-4 md:grid-cols-3 sm:grid-cols-1">
          {/* Leave Dates */}
          <div className="col-span-3 flex flex-col">
            <label className="block mb-1 text-sm font-semibold dark:text-gray-200">
              Leave Dates <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex flex-col w-full">
                <span className="text-xs dark:text-gray-400 mb-1">From Date</span>
                <input
                  type="date"
                  name="fromDate"
                  value={form.fromDate}
                  onChange={handleChange}
                  className="border rounded-md p-2 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-xs dark:text-gray-400 mb-1">To Date</span>
                <input
                  type="date"
                  name="toDate"
                  value={form.toDate}
                  onChange={handleChange}
                  className="border rounded-md p-2 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Type of Leave */}
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-semibold dark:text-gray-200">
              Type of Leave
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            >
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
              <option>Duty Leave</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-sm font-semibold dark:text-gray-200">
            Reason<span className="text-red-500">*</span>
          </label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            rows={3}
            placeholder="Write your reason here..."
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md text-base"
        >
          Submit Request
        </button>
      </form>

      {/* Leave History Table */}
      <h3 className="text-xl font-semibold mb-2 dark:text-white">Leave History</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left dark:text-white">From</th>
              <th className="px-4 py-2 text-left dark:text-white">To</th>
              <th className="px-4 py-2 text-left dark:text-white">Type</th>
              <th className="px-4 py-2 text-left dark:text-white">Reason</th>
              <th className="px-4 py-2 text-left dark:text-white">Status</th>
              <th className="px-4 py-2 text-left dark:text-white">HOD’s Note</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2 dark:text-gray-200">{req.fromDate}</td>
                <td className="px-4 py-2 dark:text-gray-200">{req.toDate}</td>
                <td className="px-4 py-2 dark:text-gray-200">{req.type}</td>
                <td className="px-4 py-2 dark:text-gray-200">{req.reason}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    req.status === "Approved"
                      ? "text-green-600"
                      : req.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}>
                  {req.status}
                </td>
                <td className="px-4 py-2 dark:text-gray-200">{req.hodNote || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
