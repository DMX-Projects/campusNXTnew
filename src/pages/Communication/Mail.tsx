import React, { useState } from "react";

export default function SendMail() {
  const [recipient, setRecipient] = useState("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    alert(`Email sent to ${recipient} with subject "${subject}"`);
    // 👉 Here you’ll connect your backend API for sending emails
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Send Email
        </h1>

        {/* Recipient selection */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Recipient
        </label>
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Students</option>
          <option value="parents">Parents</option>
          <option value="staff">Staff</option>
          <option value="custom">Custom Email Address</option>
        </select>

        {/* Subject input */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter email subject"
        />

        {/* Message box */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 h-32 mb-4 focus:ring-2 focus:ring-blue-400"
          placeholder="Write your email message..."
        ></textarea>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Send Email
        </button>
      </div>
    </div>
  );
}
