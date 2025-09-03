import React, { useState } from "react";

export default function MessageCredits() {
  const [credits] = useState({
    total: 10000,
    used: 2500,
    expiry: "31-Dec-2025",
  });

  const remaining = credits.total - credits.used;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white p-10">
      {/* Header */}
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center">
          📊 Message Credits
        </h1>
      </div>

      {/* Credit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-xl text-center shadow">
          <h2 className="text-lg font-semibold text-blue-700">Total Credits</h2>
          <p className="text-3xl font-bold text-blue-900">{credits.total}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-xl text-center shadow">
          <h2 className="text-lg font-semibold text-red-700">Used Credits</h2>
          <p className="text-3xl font-bold text-red-900">{credits.used}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl text-center shadow">
          <h2 className="text-lg font-semibold text-green-700">Remaining</h2>
          <p className="text-3xl font-bold text-green-900">{remaining}</p>
        </div>
      </div>

      {/* Expiry Date */}
      <div className="bg-yellow-100 p-4 rounded-lg mb-8 text-center shadow">
        <p className="text-yellow-800 font-medium">
          ⏳ Credits Expiry: <span className="font-bold">{credits.expiry}</span>
        </p>
      </div>

      {/* Buy More Credits Button */}
      <div className="flex justify-center mb-10">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Buy More Credits
        </button>
      </div>

      {/* Usage History Table */}
      <div className="overflow-x-auto">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">
          Usage History
        </h2>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">User</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Channel</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Credits Used
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">01-Sep-2025</td>
              <td className="border border-gray-300 px-4 py-2">Admin</td>
              <td className="border border-gray-300 px-4 py-2">SMS</td>
              <td className="border border-gray-300 px-4 py-2">500</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">30-Aug-2025</td>
              <td className="border border-gray-300 px-4 py-2">Sub-Admin</td>
              <td className="border border-gray-300 px-4 py-2">WhatsApp</td>
              <td className="border border-gray-300 px-4 py-2">300</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">28-Aug-2025</td>
              <td className="border border-gray-300 px-4 py-2">Admin</td>
              <td className="border border-gray-300 px-4 py-2">SMS</td>
              <td className="border border-gray-300 px-4 py-2">200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
