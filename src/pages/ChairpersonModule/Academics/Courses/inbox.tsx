
import React, { useState } from "react";
 const Inbox: React.FC = () =>{
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const [alertType, setAlertType] = useState("");
  const [currentView, setCurrentView] = useState("compose");

  // Sample email data for inbox view
  const [emails] = useState([
    {
      id: 1,
      from: "john.doe@example.com",
      subject: "Project Update",
      preview: "Hey team, here's the latest update on our project...",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      from: "sarah.smith@company.com",
      subject: "Meeting Tomorrow",
      preview: "Don't forget about our meeting scheduled for tomorrow at 10 AM...",
      time: "5 hours ago",
      read: true
    },
    {
      id: 3,
      from: "support@service.com",
      subject: "Your Account Has Been Updated",
      preview: "We've successfully updated your account settings as requested...",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      from: "newsletter@tech.com",
      subject: "Weekly Tech News",
      preview: "This week's top stories in technology and innovation...",
      time: "2 days ago",
      read: false
    }
  ]);

  const showAlertMessage = (message, type = "success") => {
    setShowAlert(message);
    setAlertType(type);
    setTimeout(() => {
      setShowAlert("");
      setAlertType("");
    }, 3000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!to || !subject || !body) {
      showAlertMessage("Please fill all fields!", "error");
      return;
    }
    console.log("Message Sent:", { to, subject, body });
    showAlertMessage("Message Sent Successfully ✅", "success");
    setTo("");
    setSubject("");
    setBody("");
  };

  const handleCancel = () => {
    setTo("");
    setSubject("");
    setBody("");
    showAlertMessage("Draft cleared", "info");
  };

  const handleSaveDraft = () => {
    if (!to && !subject && !body) {
      showAlertMessage("Nothing to save", "error");
      return;
    }
    showAlertMessage("Draft saved successfully", "success");
  };

  const renderInboxView = () => (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-4 lg:p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Inbox</h2>
        <p className="text-gray-600 mt-1">{emails.filter(e => !e.read).length} unread messages</p>
      </div>
      
      <div className="divide-y">
        {emails.map((email) => (
          <div
            key={email.id}
            className={`p-4 lg:p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
              !email.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-medium ${!email.read ? "text-gray-900" : "text-gray-700"}`}>
                    {email.from}
                  </span>
                  {!email.read && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <h3 className={`font-medium mb-1 ${!email.read ? "text-gray-900" : "text-gray-700"}`}>
                  {email.subject}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {email.preview}
                </p>
              </div>
              <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                {email.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComposeView = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Compose Email</h2>
      
      <div className="bg-white border rounded-xl shadow-md p-4 lg:p-6">
        {/* To Field */}
        <div className="mb-4">
          <label className="block font-medium mb-2 text-gray-700">
            <span className="text-red-500">*</span> To
          </label>
          <input
            type="email"
            placeholder="Enter recipient email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            required
          />
        </div>

        {/* Subject Field */}
        <div className="mb-4">
          <label className="block font-medium mb-2 text-gray-700">
            <span className="text-red-500">*</span> Subject
          </label>
          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            required
          />
        </div>

        {/* Body Field */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-gray-700">
            <span className="text-red-500">*</span> Body
          </label>
          <textarea
            placeholder="Write your message..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y min-h-[120px] transition-colors duration-200"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSend}
            className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <span>➤</span>
            Send
          </button>
          
          <button
            onClick={handleCancel}
            className="flex-1 sm:flex-none bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          
        
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert System */}
      {showAlert && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          alertType === "success" ? "bg-green-500 text-white" :
          alertType === "error" ? "bg-red-500 text-white" :
          "bg-blue-500 text-white"
        }`}>
          <div className="flex items-center gap-2">
            <span>
              {alertType === "success" ? "✅" : alertType === "error" ? "❌" : "ℹ️"}
            </span>
            {showAlert}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4 bg-white border-b lg:border-b-0 lg:border-r p-4">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">Mailbox</h3>
          
          {/* Navigation Buttons */}
          <div className="flex flex-row lg:flex-col gap-3">
            <button 
              onClick={() => setCurrentView("compose")}
              className={`flex-1 lg:flex-none px-4 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2 ${
                currentView === "compose" 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              <span>✏️</span>
              Compose
            </button>
            
            <button 
              onClick={() => setCurrentView("inbox")}
              className={`flex-1 lg:flex-none px-4 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2 ${
                currentView === "inbox" 
                  ? "bg-gray-700 text-white" 
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <span>📥</span>
              Inbox
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-auto lg:ml-2">
                {emails.filter(e => !e.read).length}
              </span>
            </button>
            
            {/* Desktop Only Navigation */}
            <div className="hidden lg:flex lg:flex-col lg:gap-3">
              
              
           
            </div>
          </div>

          {/* User Info Section */}
          <div className="hidden lg:block mt-8 pt-6 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                JD
              </div>
              <div>
                <p className="font-medium text-gray-800">John Doe</p>
                <p className="text-sm text-gray-600">john@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            {currentView === "compose" ? renderComposeView() : renderInboxView()}

            {/* Mobile Quick Actions */}
            <div className="mt-6 grid grid-cols-2 lg:hidden gap-3">
              <button className="bg-white border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                <span>📤</span>
                Sent
              </button>
              
             
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;