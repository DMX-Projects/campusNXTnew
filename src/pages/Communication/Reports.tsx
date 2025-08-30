import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  messages: number;
}

interface ReportRow {
  id: number;
  channel: string;
  sent: number;
  date: string;
}

const Reports: React.FC = () => {
  // Chart Data
  const data: ChartData[] = [
    { name: "WhatsApp", messages: 120 },
    { name: "Email", messages: 80 },
    { name: "SMS", messages: 50 },
  ];

  // Table Data
  const reportData: ReportRow[] = [
    { id: 1, channel: "WhatsApp", sent: 50, date: "2025-08-20" },
    { id: 2, channel: "Email", sent: 30, date: "2025-08-21" },
    { id: 3, channel: "SMS", sent: 10, date: "2025-08-22" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <div className="bg-white rounded-3xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Reports Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-100 to-indigo-200 shadow hover:shadow-lg transition">
            <h3 className="text-gray-700 text-lg font-semibold">Total Messages Sent</h3>
            <p className="text-3xl font-bold text-indigo-700 mt-2">250</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-green-100 to-green-200 shadow hover:shadow-lg transition">
            <h3 className="text-gray-700 text-lg font-semibold">Credits Used</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">200</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-100 to-yellow-200 shadow hover:shadow-lg transition">
            <h3 className="text-gray-700 text-lg font-semibold">Active Users</h3>
            <p className="text-3xl font-bold text-yellow-700 mt-2">15</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Messages by Channel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="messages" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Channel</th>
                  <th className="p-3">Messages Sent</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`transition hover:bg-indigo-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{row.id}</td>
                    <td className="p-3 font-medium">{row.channel}</td>
                    <td className="p-3">{row.sent}</td>
                    <td className="p-3">{row.date}</td>
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

export default Reports;
