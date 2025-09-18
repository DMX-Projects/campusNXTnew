import React, { useState } from "react";

export default function ReportsPage() {
  // Dummy data for table
  const reports = [
    {
      id: 1,
      date: "2025-09-01 10:30 AM",
      type: "SMS",
      sentBy: "Admin",
      recipients: "1st Year Students",
      status: "Success",
    },
    {
      id: 2,
      date: "2025-09-01 09:15 AM",
      type: "WhatsApp",
      sentBy: "Sub-Admin",
      recipients: "Parents Group",
      status: "Success",
    },
    {
      id: 3,
      date: "2025-08-31 04:45 PM",
      type: "Email",
      sentBy: "Admin",
      recipients: "All Teachers",
      status: "Failed",
    },
    {
      id: 4,
      date: "2025-08-30 11:00 AM",
      type: "Push Notification",
      sentBy: "Admin",
      recipients: "All Students",
      status: "Success",
    },
  ];

  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Filtering logic
  const filteredReports = reports.filter((report) => {
    const matchesType = filterType ? report.type === filterType : true;
    const matchesDate = filterDate
      ? report.date.startsWith(filterDate)
      : true;
    return matchesType && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Communication Reports
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
          <p className="text-sm text-blue-600">Total SMS</p>
          <h2 className="text-2xl font-bold text-blue-800">1,245</h2>
        </div>
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
          <p className="text-sm text-blue-600">WhatsApp Messages</p>
          <h2 className="text-2xl font-bold text-blue-800">980</h2>
        </div>
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
          <p className="text-sm text-blue-600">Emails Sent</p>
          <h2 className="text-2xl font-bold text-blue-800">750</h2>
        </div>
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
          <p className="text-sm text-blue-600">Push Notifications</p>
          <h2 className="text-2xl font-bold text-blue-800">1,100</h2>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-blue-600 mb-1">Filter by Type</label>
          <select
            className="p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value="SMS">SMS</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Push Notification">Push Notification</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-blue-600 mb-1">Filter by Date</label>
          <input
            type="date"
            className="p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Detailed Report
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Sent By</th>
                <th className="p-3 text-left">Recipients</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="p-3">{report.date}</td>
                    <td className="p-3">{report.type}</td>
                    <td className="p-3">{report.sentBy}</td>
                    <td className="p-3">{report.recipients}</td>
                    <td
                      className={`p-3 font-medium ${
                        report.status === "Success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {report.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No reports found for selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
