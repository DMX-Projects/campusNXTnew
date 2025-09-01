import React, { useState } from "react";

const SendPushNotification: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!title.trim() || !message.trim()) return;
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      alert(`✅ Push Notification Sent!\n\nTitle: ${title}\nMessage: ${message}\nAudience: ${audience}`);
      setTitle("");
      setMessage("");
      setAudience("all");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Send Push Notification
        </h1>

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
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          />
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
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Audience */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Audience
          </label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
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
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </div>
    </div>
  );
};

export default SendPushNotification;
