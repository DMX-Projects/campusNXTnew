import React, { useState } from "react";
import { Mail } from "lucide-react";

const SendMail: React.FC = () => {
  const [recipient, setRecipient] = useState("all");
  const [customEmail, setCustomEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const target =
      recipient === "custom"
        ? customEmail
        : recipient.replace(/^\w/, (c) => c.toUpperCase());
    alert(`Email sent to ${target}\nSubject: ${subject}\nMessage: ${message}`);
    // 👉 Later: Integrate with backend email API
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white p-10">
      {/* Header */}
      <div className="flex items-center justify-center mb-10">
        <Mail className="text-blue-600 w-9 h-9 mr-2" />
        <h1 className="text-3xl font-bold text-blue-700">Send Email</h1>
      </div>

      {/* Recipient */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">
          Select Recipient
        </label>
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Students</option>
          <option value="parents">Parents</option>
          <option value="staff">Staff</option>
          <option value="custom">Custom Email Address</option>
        </select>
      </div>

      {/* Custom Email */}
      {recipient === "custom" && (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Custom Email
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={customEmail}
            onChange={(e) => setCustomEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Subject */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Subject</label>
        <input
          type="text"
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Message */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-2 font-medium">Message</label>
        <textarea
          placeholder="Write your email message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Send Email
      </button>
    </div>
  );
};

export default SendMail;
