import React, { useState } from "react";

const SendSMS: React.FC = () => {
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("custom");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (message.trim() === "" || (audience === "custom" && numbers.trim() === "")) return;

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      alert(`✅ SMS Sent!\n\nAudience: ${audience}\nNumbers: ${numbers || "N/A"}\nMessage: ${message}`);
      setNumbers("");
      setMessage("");
      setAudience("custom");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          📩 Send SMS
        </h1>

        {/* Audience Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Audience
          </label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
          >
            <option value="custom">Custom Numbers</option>
            <option value="all">All Users</option>
            <option value="hods">All HOD's</option>
            <option value="staff">All Staff</option>
            <option value="non-teaching">Non Teaching Staff</option>
          </select>
        </div>

        {/* Mobile Numbers Input (only for custom) */}
        {audience === "custom" && (
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Mobile Numbers
            </label>
            <input
              type="text"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              placeholder="9876543210, 9123456789"
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
            />
          </div>
        )}

        {/* SMS Message */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter SMS message..."
            rows={6}
            className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={(!message.trim() || (audience === "custom" && !numbers.trim())) || loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-8 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.98]"
        >
          {loading ? "Sending..." : "Send SMS"}
        </button>
      </div>
    </div>
  );
};

export default SendSMS;
