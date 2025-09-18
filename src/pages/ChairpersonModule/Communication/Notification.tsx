import React, { useState } from "react";
import { BellIcon } from "@heroicons/react/24/solid";

const SendPushNotification: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = () => {
    if (!title.trim() || !message.trim()) return;
    setLoading(true);
    setSuccess(false);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTitle("");
      setMessage("");
      setAudience("all");
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="w-full p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center mb-6">
        <BellIcon className="h-8 w-8 text-indigo-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">
          Send Push Notification
        </h1>
      </div>

      {/* Success Banner */}
      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 font-medium animate-fadeIn">
          ✅ Notification sent successfully!
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Notification Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all
              ${
                !title.trim()
                  ? "border-gray-300 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
          />
          {!title.trim() && (
            <p className="text-red-500 text-xs mt-1">Title is required.</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message..."
            rows={4}
            className={`w-full px-4 py-3 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 transition-all
              ${
                !message.trim()
                  ? "border-gray-300 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
          />
          {!message.trim() && (
            <p className="text-red-500 text-xs mt-1">Message is required.</p>
          )}
        </div>

        {/* Audience */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Audience
          </label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          >
            <option value="all">All Users</option>
            <option value="admins">Admins Only</option>
            <option value="users">Users Only</option>
          </select>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!title.trim() || !message.trim() || loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </div>

      {/* Live Preview */}
      {(title || message) && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            📱 Live Preview
          </h2>
          <div className="border rounded-lg p-3 bg-gray-50">
            <p className="font-bold text-gray-800">{title || "Title..."}</p>
            <p className="text-gray-600">{message || "Message..."}</p>
            <p className="text-xs text-gray-500 mt-2">Audience: {audience}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendPushNotification;
