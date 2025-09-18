import React, { useState, useEffect } from "react";
import { X, Paperclip, Send, Mail, Edit3 } from 'lucide-react';

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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mailbox</h2>
          </div>
          <button
            onClick={() => setComposing(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Compose</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === "inbox"
                ? "border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            Inbox
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === "sent"
                ? "border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            Sent
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800/50">
          {loading ? (
            <div className="space-y-1 p-2">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse bg-white dark:bg-gray-800 mx-2 mt-2 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {displayedMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (activeTab === "inbox") {
                      setMessages((prev) =>
                        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
                      );
                    }
                  }}
                  className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                    selectedMessage?.id === msg.id ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-blue-50 dark:bg-blue-900/30" : ""
                  } ${!msg.read && activeTab === "inbox" ? "shadow-sm" : ""}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {msg.sender
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium truncate ${
                          !msg.read && activeTab === "inbox" 
                            ? "text-gray-900 dark:text-white font-semibold" 
                            : "text-gray-700 dark:text-gray-300"
                        }`}>
                          {activeTab === "inbox" ? msg.sender : msg.to}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{msg.date}</p>
                      </div>
                      <p className={`text-sm truncate mt-1 ${
                        !msg.read && activeTab === "inbox" 
                          ? "text-gray-800 dark:text-gray-200 font-medium" 
                          : "text-gray-600 dark:text-gray-400"
                      }`}>
                        {msg.subject}
                      </p>
                      {!msg.read && activeTab === "inbox" && (
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        {/* Compose Modal */}
        {composing && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compose Mail</h3>
                <button
                  onClick={() => setComposing(false)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)] bg-white dark:bg-gray-800">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
                  <input
                    type="email"
                    name="to"
                    value={composeData.to}
                    onChange={handleComposeChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                    placeholder="recipient@example.com"
                  />
                  {errors.to && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.to}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={composeData.subject}
                    onChange={handleComposeChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                    placeholder="Email subject"
                  />
                  {errors.subject && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    name="body"
                    value={composeData.body}
                    onChange={handleComposeChange}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none"
                    placeholder="Type your message here..."
                  />
                  {errors.body && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.body}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <Paperclip className="w-4 h-4 mr-2" />
                      Choose Files
                    </label>
                    {composeData.attachments.length > 0 && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {composeData.attachments.length} file(s) selected
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <button
                  onClick={() => setComposing(false)}
                  className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sendComposeMail}
                  className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Display */}
        {selectedMessage ? (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {selectedMessage.subject}
              </h1>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {activeTab === "inbox" ? (
                  <p><span className="font-medium text-gray-900 dark:text-gray-300">From:</span> {selectedMessage.sender}</p>
                ) : (
                  <p><span className="font-medium text-gray-900 dark:text-gray-300">To:</span> {selectedMessage.to}</p>
                )}
                <p><span className="font-medium text-gray-900 dark:text-gray-300">Date:</span> {selectedMessage.date}</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 leading-relaxed">
                    {selectedMessage.body}
                  </div>
                </div>
                
                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Attachments:</h4>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{file.name}</span>
                          <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ml-auto">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <Mail className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">Select a message to read.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Choose from your inbox or sent messages.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
