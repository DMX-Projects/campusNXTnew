import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Search,
  Mail,
  MailOpen,
  User,
  Calendar,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  Clock,
  GraduationCap,
} from "lucide-react";

interface ExamMessage {
  id: number;
  sender: string;
  recipient?: string;
  subject: string;
  date: string; // ISO or string date
  body: string;
  read: boolean;
  attachments?: File[];
  priority: "low" | "medium" | "high";
  category: "exam_schedule" | "grade_submission" | "revaluation" | "postponement" | "general" | "urgent";
  senderRole: "faculty" | "student" | "admin" | "system";
}

const MOCK_INBOX: ExamMessage[] = [
  {
    id: 1,
    sender: "Dr. Sarah Williams",
    recipient: "Chairperson",
    senderRole: "faculty",
    subject: "Grade Submission Extension Request",
    date: "2025-09-02T09:30",
    body:
      "I need a 2-day extension for submitting grades for CSE301 due to unforeseen circumstances. The current deadline is Sept 5.",
    read: false,
    priority: "high",
    category: "grade_submission",
    attachments: [],
  },
  {
    id: 2,
    sender: "System",
    recipient: "Chairperson",
    senderRole: "system",
    subject: "Exam Schedule Conflict - Room 203",
    date: "2025-09-02T08:15",
    body:
      "Schedule conflict detected: Two exams scheduled in Room 203 on Sept 8 at 10:00 AM. Please resolve.",
    read: false,
    priority: "high",
    category: "exam_schedule",
    attachments: [],
  },
  {
    id: 3,
    sender: "John Mitchell",
    recipient: "Chairperson",
    senderRole: "student",
    subject: "Revaluation Request - ENG202",
    date: "2025-09-01T16:45",
    body: "Request for reevaluation: ENG202. Student ID: 2021CS001. Possible grading error.",
    read: true,
    priority: "medium",
    category: "revaluation",
    attachments: [],
  },
];

const MOCK_SENT: ExamMessage[] = [
  {
    id: 101,
    sender: "Chairperson",
    recipient: "Placement Cell",
    senderRole: "admin",
    subject: "Upcoming Exam Schedule Confirmation",
    date: "2025-08-31T12:00",
    body:
      "Please confirm the finalized exam schedule for the upcoming semester by end of this week.",
    read: true,
    priority: "medium",
    category: "exam_schedule",
    attachments: [],
  },
  {
    id: 102,
    sender: "Chairperson",
    recipient: "Finance Office",
    senderRole: "admin",
    subject: "Grade Submission Budget Needs",
    date: "2025-08-29T09:30",
    body:
      "Requesting additional budget for proctoring services during final exams.",
    read: true,
    priority: "low",
    category: "general",
    attachments: [],
  },
];

const formatDateTime = (isoString: string) => {
  const d = new Date(isoString);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "exam_schedule":
      return "bg-blue-100 text-blue-800";
    case "grade_submission":
      return "bg-green-100 text-green-800";
    case "revaluation":
      return "bg-purple-100 text-purple-800";
    case "postponement":
      return "bg-orange-100 text-orange-800";
    case "urgent":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return <AlertCircle className="w-4 h-4 text-red-500" aria-label="High priority" />;
    case "medium":
      return <Clock className="w-4 h-4 text-yellow-500" aria-label="Medium priority" />;
    case "low":
      return <CheckCircle className="w-4 h-4 text-green-500" aria-label="Low priority" />;
    default:
      return null;
  }
};

const Inbox: React.FC = () => {
  const [inboxMessages, setInboxMessages] = useState<ExamMessage[]>([]);
  const [sentMessages, setSentMessages] = useState<ExamMessage[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<ExamMessage | null>(null);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [loadingSent, setLoadingSent] = useState(true);

  const [tab, setTab] = useState<"inbox" | "sent">("inbox");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | string>("all");

  // Compose mail state
  const [composing, setComposing] = useState(false);
  const [composeData, setComposeData] = useState({
    recipient: "",
    subject: "",
    body: "",
    attachments: [] as File[],
  });
  const [errors, setErrors] = useState<{
    recipient?: string;
    subject?: string;
    body?: string;
  }>({});

  useEffect(() => {
    setLoadingInbox(true);
    setLoadingSent(true);
    // Simulate API loading
    setTimeout(() => {
      setInboxMessages(MOCK_INBOX);
      setSentMessages(MOCK_SENT);
      setLoadingInbox(false);
      setLoadingSent(false);
    }, 1000);
  }, []);

  // Choose messages based on tab
  const currentMessages = tab === "inbox" ? inboxMessages : sentMessages;

  // Filter and search
  const filteredMessages = currentMessages.filter((msg) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      msg.subject.toLowerCase().includes(term) || msg.sender.toLowerCase().includes(term);
    const matchesCategory = filterCategory === "all" || msg.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const unreadCount = inboxMessages.filter((m) => !m.read).length;
  const highPriorityCount = inboxMessages.filter((m) => m.priority === "high").length;

  const markAsRead = (id: number) => {
    setInboxMessages((msgs) =>
      msgs.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleComposeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComposeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setComposeData((prev) => ({ ...prev, attachments: Array.from(e.target.files!) }));
    }
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateCompose = () => {
    const errs: typeof errors = {};
    if (!composeData.recipient.trim()) errs.recipient = "Recipient is required";
    else if (!validateEmail(composeData.recipient)) errs.recipient = "Invalid email format";
    if (!composeData.subject.trim()) errs.subject = "Subject is required";
    if (!composeData.body.trim()) errs.body = "Message body is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const sendMail = () => {
    if (!validateCompose()) return;

    const newMessage: ExamMessage = {
      id: Date.now(),
      sender: "Chairperson",
      recipient: composeData.recipient,
      senderRole: "admin",
      subject: composeData.subject,
      date: new Date().toISOString(),
      body: composeData.body,
      read: true,
      attachments: composeData.attachments,
      priority: "medium",
      category: "general",
    };
    setSentMessages((msgs) => [newMessage, ...msgs]);
    setComposeData({ recipient: "", subject: "", body: "", attachments: [] });
    setErrors({});
    setComposing(false);
    alert("Message sent successfully");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className="w-80 border-r border-gray-200 bg-white flex flex-col shadow-md">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            Examination Inbox
          </h2>
          <button
            onClick={() => setComposing(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Compose
          </button>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 border-b-2 ${
              tab === "inbox" ? "border-blue-600 font-bold" : "border-transparent"
            }`}
            onClick={() => setTab("inbox")}
          >
            Inbox {unreadCount > 0 && <span className="text-red-600">({unreadCount})</span>}
          </button>
          <button
            className={`flex-1 py-2 border-b-2 ${
              tab === "sent" ? "border-blue-600 font-bold" : "border-transparent"
            }`}
            onClick={() => setTab("sent")}
          >
            Sent
          </button>
        </div>

        <div className="p-4 space-y-2 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 py-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search messages"
            />
          </div>
          <select
            className="w-full p-2 border rounded"
            aria-label="Filter messages by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="exam_schedule">Exam Schedule</option>
            <option value="grade_submission">Grade Submission</option>
            <option value="revaluation">Revaluation</option>
            <option value="postponement">Postponement</option>
            <option value="general">General</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <section className="overflow-y-auto flex-grow">
          {filteredMessages.length === 0 ? (
            <p className="p-6 text-center text-gray-500">No messages found.</p>
          ) : (
            filteredMessages.map((msg) => (
              <button
                key={msg.id}
                className={`flex w-full items-center p-3 gap-3 cursor-pointer ${
                  selectedMsg?.id === msg.id ? "bg-blue-100 border-l-4 border-blue-600" : ""
                } ${!msg.read ? "font-semibold bg-blue-50 border-l-4 border-blue-400" : ""}`}
                onClick={() => {
                  setSelectedMsg(msg);
                  if (!msg.read && tab === "inbox") {
                    markAsRead(msg.id);
                  }
                }}
                aria-pressed={selectedMsg?.id === msg.id}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-300 text-white flex items-center justify-center font-semibold">
                  {msg.sender
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="flex flex-col truncate min-w-0">
                  <span className="text-gray-900 truncate">{msg.sender}</span>
                  <span className="text-gray-600 text-sm truncate">{msg.subject}</span>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded ${getCategoryStyle(msg.category)}`}>
                    {msg.category.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <time className="ml-auto text-gray-400 text-xs whitespace-nowrap">
                  {new Date(msg.date).toLocaleDateString()}
                </time>
              </button>
            ))
          )}
        </section>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col relative">
        {composing && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-30 flex items-center justify-center p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMail();
              }}
              className="bg-white rounded shadow-lg max-w-3xl w-full p-6 relative"
              aria-label="Compose new message"
            >
              <button
                type="button"
                onClick={() => setComposing(false)}
                aria-label="Close compose form"
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-2xl leading-none"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Compose New Message</h2>

              <div className="mb-4">
                <label htmlFor="recipient" className="block font-semibold mb-1">
                  To
                </label>
                <input
                  id="recipient"
                  name="recipient"
                  type="email"
                  value={composeData.recipient}
                  onChange={(e) => setComposeData(prev => ({ ...prev, recipient: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                  placeholder="recipient@example.com"
                />
                {errors.recipient && <p className="text-red-600 text-sm">{errors.recipient}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block font-semibold mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                  placeholder="Subject"
                />
                {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="body" className="block font-semibold mb-1">
                  Message
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={composeData.body}
                  onChange={(e) => setComposeData(prev => ({ ...prev, body: e.target.value }))}
                  required
                  className="w-full p-2 border rounded min-h-[150px]"
                  placeholder="Write your message here"
                />
                {errors.body && <p className="text-red-600 text-sm">{errors.body}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="attachments" className="block font-semibold mb-1">
                  Attachments
                </label>
                <input
                  id="attachments"
                  name="attachments"
                  type="file"
                  multiple
                  onChange={(e) => {
                    if(e.target.files){
                      setComposeData(prev => ({ ...prev, attachments: Array.from(e.target.files) }))
                    }
                  }}
                />
                {composeData.attachments.length > 0 && (
                  <ul className="text-sm mt-2 max-h-20 overflow-auto">
                    {composeData.attachments.map((f, i) => (
                      <li key={i}>{f.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                  onClick={() => setComposing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                  Send
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-col h-full overflow-auto p-6">
          {!selectedMsg ? (
            <div className="m-auto text-center text-gray-400">
              <GraduationCap className="mx-auto w-24 h-24 mb-4" />
              <p className="text-lg">Select a message to read</p>
            </div>
          ) : (
            <article className="max-w-3xl mx-auto bg-white rounded shadow p-6 space-y-4">
              <h2 className="text-2xl font-semibold">{selectedMsg.subject}</h2>
              <div className="text-gray-600 flex flex-wrap gap-4">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {selectedMsg.sender} ({selectedMsg.senderRole})</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDateTime(selectedMsg.date)}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getCategoryStyle(selectedMsg.category)}`}>
                  {selectedMsg.category.toUpperCase()}
                </span>
                <span>{getPriorityIcon(selectedMsg.priority)}</span>
              </div>
              <hr />
              <p className="whitespace-pre-wrap text-gray-700">{selectedMsg.body}</p>
              {selectedMsg.attachments && selectedMsg.attachments.length > 0 && (
                <section>
                  <h3 className="font-semibold mb-1">Attachments</h3>
                  <ul>
                    {selectedMsg.attachments.map((att, i) => (
                      <li key={i} className="text-blue-600 underline cursor-pointer">{att.name}</li>
                    ))}
                  </ul>
                </section>
              )}
              {/* Actions placeholder */}
            </article>
          )}
        </div>
      </main>
    </div>
  );
}

export default Inbox;
