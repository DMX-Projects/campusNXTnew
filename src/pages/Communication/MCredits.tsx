import React, { useState } from "react";

const MessageCredits: React.FC = () => {
  // Initial credits (demo)
  const [credits, setCredits] = useState(100);

  const handleSendMessage = () => {
    if (credits > 0) {
      setCredits(credits - 1); // deduct 1 credit per message
    } else {
      alert("Not enough credits! Please buy more.");
    }
  };

  const handleBuyCredits = () => {
    setCredits(credits + 50); // Add 50 credits for demo
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-2xl shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">💳 Message Credits</h2>

      {/* Credits Display */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <p className="text-gray-600">Available Credits</p>
        <h3 className="text-3xl font-bold text-green-600">{credits}</h3>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        {/* <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send Message (Use 1 Credit)
        </button> */}

        <button
          onClick={handleBuyCredits}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Buy +50 Credits
        </button>
      </div>
    </div>
  );
};

export default MessageCredits;
