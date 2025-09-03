import React, { useState, useEffect } from "react";

interface Message {
  id: number;
  sender: string;
  to?: string; 
  subject: string;
  date: string;
  body: string;
  read: boolean;
  attachments?: File[];
}

const Inbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [composing, setComposing] = useState(false);
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    body: "",
    attachments: [] as File[],
  });
  const [errors, setErrors] = useState<{ to?: string; subject?: string; body?: string }>({});
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const messageBody = `Dear Placement Team,

We are excited to inform you about our upcoming placement drive and request your assistance in sharing this opportunity with your eligible students.

Drive Details:
- Company: Tech Innovators Pvt. Ltd.
- Date: 10th September 2025
- Time: 10:00 AM – 5:00 PM
- Location: College Campus, Auditorium
- Eligible Branches: CSE, IT, ECE, EEE

Instructions for Students:
1. Students should register online via the provided registration link before 5th September 2025.
2. They should carry multiple copies of their latest resume.
3. Valid college ID cards are mandatory.
4. Dress code: Formal business attire.
5. Selected students will be notified via email for the next rounds.

We look forward to welcoming your talented students to our drive. For any queries, please reach out to our HR team at hr@techinnovators.com.

Best regards,
Tech Innovators Pvt. Ltd. – HR Team`;


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          sender: "Company Placement",
          subject: "Upcoming Placement Drive – Register Now",
          date: "2025-08-28",
          body: messageBody,
          read: false,
        },
        {
          id: 2,
          sender: "HR Team",
          subject: "Interview Schedule",
          date: "2025-08-27",
          body: "Your interview is scheduled for next week.",
          read: true,
        },
        {
          id: 3,
          sender: "Placement Cell",
          subject: "Internship Opportunities",
          date: "2025-08-26",
          body: "Check out new internships available for students.",
          read: false,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [messageBody]);

  const handleComposeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComposeData({ ...composeData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setComposeData({ ...composeData, attachments: Array.from(e.target.files) });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateCompose = () => {
    const newErrors: typeof errors = {};
    if (!composeData.to.trim()) newErrors.to = "Recipient is required";
    else if (!validateEmail(composeData.to)) newErrors.to = "Invalid email format";
    if (!composeData.subject.trim()) newErrors.subject = "Subject is required";
    if (!composeData.body.trim()) newErrors.body = "Message body is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendComposeMail = () => {
    if (!validateCompose()) return;

    const newMail: Message = {
      id: sentMessages.length + 1,
      sender: "You",
      to: composeData.to,
      subject: composeData.subject,
      date: new Date().toISOString().split("T")[0],
      body: composeData.body,
      read: true,
      attachments: composeData.attachments,
    };

    setSentMessages([newMail, ...sentMessages]);
    setComposing(false);
    setComposeData({ to: "", subject: "", body: "", attachments: [] });
    setErrors({});
  };

  const displayedMessages = activeTab === "inbox" ? messages : sentMessages;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-white shadow-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Mailbox</h2>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setComposing(true)}
          >
            Compose
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 ${activeTab === "inbox" ? "border-b-2 border-blue-500 font-bold" : ""}`}
            onClick={() => setActiveTab("inbox")}
          >
            Inbox
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === "sent" ? "border-b-2 border-blue-500 font-bold" : ""}`}
            onClick={() => setActiveTab("sent")}
          >
            Sent
          </button>
        </div>

        {loading ? (
          <div className="p-4 space-y-2">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="h-14 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <ul className="overflow-y-auto flex-1">
            {displayedMessages.map((msg) => (
              <li
                key={msg.id}
                className={`flex items-center p-3 border-b cursor-pointer hover:bg-blue-50 transition ${
                  msg.read ? "" : "bg-blue-50 font-semibold"
                }`}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (activeTab === "inbox") {
                    setMessages((prev) =>
                      prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
                    );
                  }
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-200 text-white font-bold mr-3">
                  {msg.sender
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{activeTab === "inbox" ? msg.sender : msg.to}</span>
                    <span className="text-gray-400 text-xs">{msg.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm truncate">{msg.subject}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">
        {/* Compose Modal */}
        {composing && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-1/2 rounded shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Compose Mail</h2>

              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  name="to"
                  placeholder="To"
                  value={composeData.to}
                  onChange={handleComposeChange}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.to && <span className="text-red-500 text-sm">{errors.to}</span>}

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={composeData.subject}
                  onChange={handleComposeChange}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.subject && <span className="text-red-500 text-sm">{errors.subject}</span>}

                <textarea
                  name="body"
                  placeholder="Message"
                  value={composeData.body}
                  onChange={handleComposeChange}
                  className="w-full border px-3 py-2 rounded h-64 resize-none"
                />
                {errors.body && <span className="text-red-500 text-sm">{errors.body}</span>}

                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setComposing(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={sendComposeMail}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Display */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedMessage ? (
            <div className="bg-white rounded shadow p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedMessage.subject}</h2>
              <div className="flex justify-between text-gray-500 text-sm">
                {activeTab === "inbox" ? (
                  <span>From: {selectedMessage.sender}</span>
                ) : (
                  <span>To: {selectedMessage.to}</span>
                )}
                <span>{selectedMessage.date}</span>
              </div>
              <hr />
              <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.body}</p>
              {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                <div>
                  <h3 className="font-semibold mt-2">Attachments:</h3>
                  <ul className="list-disc list-inside">
                    {selectedMessage.attachments.map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-20 text-lg">
              Select a message to read.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
