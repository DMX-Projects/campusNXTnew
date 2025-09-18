import { useState } from "react";

type LeaveRequest = {
  id: number;
  dates: string;
  type: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  hodNote?: string;
};

export default function LeaveRequest() {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      dates: "2025-09-10 to 2025-09-12",
      type: "Casual Leave",
      reason: "Family function",
      status: "Approved",
      hodNote: "Approved, ensure classes are adjusted",
    },
    {
      id: 2,
      dates: "2025-09-15",
      type: "Sick Leave",
      reason: "Fever",
      status: "Pending",
    },
  ]);

  const [form, setForm] = useState({
    dates: "",
    type: "Casual Leave",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.dates || !form.reason) {
      alert("Please fill all required fields");
      return;
    }
    const newRequest: LeaveRequest = {
      id: requests.length + 1,
      dates: form.dates,
      type: form.type,
      reason: form.reason,
      status: "Pending",
    };
    setRequests((prev) => [newRequest, ...prev]);
    setForm({ dates: "", type: "Casual Leave", reason: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Faculty Leave Request</h2>

      {/* Leave Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-gray-200">
              Leave Dates<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="dates"
              placeholder="e.g. 2025-09-20 to 2025-09-22"
              value={form.dates}
              onChange={handleChange}
              className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-gray-200">
              Type of Leave
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            >
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
              <option>Duty Leave</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-sm font-medium dark:text-gray-200">
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
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
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
              <th className="px-4 py-2 text-left dark:text-white">Dates</th>
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
                <td className="px-4 py-2 dark:text-gray-200">{req.dates}</td>
                <td className="px-4 py-2 dark:text-gray-200">{req.type}</td>
                <td className="px-4 py-2 dark:text-gray-200">{req.reason}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    req.status === "Approved"
                      ? "text-green-600"
                      : req.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
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
