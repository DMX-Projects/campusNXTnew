 import React, { useState } from "react";

const Inbox: React.FC = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !body) {
      alert("Please fill all fields!");
      return;
    }
    console.log("Message Sent:", { to, subject, body });
    alert("Message Sent Successfully ✅");
    setTo("");
    setSubject("");
    setBody("");
  };

  const handleCancel = () => {
    setTo("");
    setSubject("");
    setBody("");
  };

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white border-r p-4">
        <h3 className="font-semibold text-lg mb-4">Mailbox</h3>

        {/* Compose Button */}
        <div className="flex flex-col gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Compose
          </button>

          {/* Inbox Button */}
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            📥 Inbox
          </button>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-3/4 p-6">
        <form
          onSubmit={handleSend}
          className="bg-white border rounded-xl shadow-md p-6"
        >
          {/* To */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              <span className="text-red-500">*</span> To
            </label>
            <input
              type="email"
              placeholder="Enter recipient email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              <span className="text-red-500">*</span> Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Body */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              <span className="text-red-500">*</span> Body
            </label>
            <textarea
              placeholder="Write your message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              ➤ Send
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inbox;
