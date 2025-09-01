import React, { useState } from "react";

const SendSMS: React.FC = () => {
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("custom");

  const handleSend = () => {
    if (message.trim() === "" || (audience === "custom" && numbers.trim() === "")) return;

    console.log("SMS Sent:", { numbers, message, audience });

    setNumbers("");
    setMessage("");
    setAudience("custom");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          📩 Send SMS
        </h2>

        {/* Audience Selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
          >
            <option value="custom">Custom Numbers</option>
            <option value="all">All Users</option>
            <option value="admins">All HOD's</option>
            <option value="admins">All Staff</option>
            <option value="users">Non Teaching Staff</option>
          </select>
        </div>

        {/* Mobile Numbers Input (only for custom) */}
        {audience === "custom" && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Numbers</label>
            <input
              type="text"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              placeholder="9876543210, 9123456789"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
            />
          </div>
        )}

        {/* SMS Message */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter SMS message"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
            rows={4}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 rounded-xl shadow-md transition duration-300"
        >
          Send SMS
        </button>

      </div>
    </div>
  );
};

export default SendSMS;
