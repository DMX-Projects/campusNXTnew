import React, { useState } from "react";

export default function MessageCredits() {
  const [credits, setCredits] = useState({
    total: 10000,
    used: 2500,
    expiry: "31-Dec-2025",
  });

  const remaining = credits.total - credits.used;

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          📊 Message Credits
        </h1>

        {/* Credit Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-100 p-5 rounded-xl shadow text-center">
            <h2 className="text-lg font-semibold text-blue-700">Total Credits</h2>
            <p className="text-2xl font-bold text-blue-900">{credits.total}</p>
          </div>
          <div className="bg-red-100 p-5 rounded-xl shadow text-center">
            <h2 className="text-lg font-semibold text-red-700">Used Credits</h2>
            <p className="text-2xl font-bold text-red-900">{credits.used}</p>
          </div>
          <div className="bg-green-100 p-5 rounded-xl shadow text-center">
            <h2 className="text-lg font-semibold text-green-700">Remaining</h2>
            <p className="text-2xl font-bold text-green-900">{remaining}</p>
          </div>
        </div>

        {/* Expiry Date */}
        <div className="bg-yellow-100 p-4 rounded-lg mb-6 text-center">
          <p className="text-yellow-800 font-medium">
            ⏳ Credits Expiry: <span className="font-bold">{credits.expiry}</span>
          </p>
        </div>

        {/* Buy More Credits Button */}
        <div className="flex justify-center mb-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
            Buy More Credits
          </button>
        </div>

        {/* Usage History Table */}
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">
            Usage History
          </h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">User</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Channel</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Credits Used</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">01-Sep-2025</td>
                <td className="border border-gray-300 px-4 py-2">Admin</td>
                <td className="border border-gray-300 px-4 py-2">SMS</td>
                <td className="border border-gray-300 px-4 py-2">500</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">30-Aug-2025</td>
                <td className="border border-gray-300 px-4 py-2">Sub-Admin</td>
                <td className="border border-gray-300 px-4 py-2">WhatsApp</td>
                <td className="border border-gray-300 px-4 py-2">300</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">28-Aug-2025</td>
                <td className="border border-gray-300 px-4 py-2">Admin</td>
                <td className="border border-gray-300 px-4 py-2">SMS</td>
                <td className="border border-gray-300 px-4 py-2">200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
