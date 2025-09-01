import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const SendWhatsApp: React.FC = () => {
  const [audience, setAudience] = useState("Custom Numbers");
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    alert(`WhatsApp message sent to: ${numbers}\nMessage: ${message}`);
    // Later we can integrate WhatsApp API here
  };

  return (
    <div className="flex justify-center items-center w-full p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        {/* Title */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <MessageCircle className="text-blue-500 w-6 h-6" />
          <h2 className="text-xl font-bold text-blue-600">Send WhatsApp Message</h2>
        </div>

        {/* Audience */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Audience</label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option>Custom Numbers</option>
            <option>All Students</option>
            <option>All Parents</option>
            <option>All HOD's</option>
            <option>Non Teaching Staff</option>
            <option>All Staff</option>
          </select>
        </div>

        {/* Mobile Numbers */}
        {audience === "Custom Numbers" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mobile Numbers</label>
            <input
              type="text"
              placeholder="9876543210, 9123456789"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        )}

        {/* Message */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            placeholder="Enter WhatsApp message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 h-28 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Send WhatsApp Message
        </button>
      </div>
    </div>
  );
};

export default SendWhatsApp;
