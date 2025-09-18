import React, { useState } from "react";
import { Mail, X, Send, Search, Star, Archive, Trash2, Reply, Forward, MoreHorizontal, Clock, User, Tag, Paperclip, Bell } from "lucide-react";

interface Message {
  id: number;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  category: string;
  hasAttachment?: boolean;
}

const HostelInbox: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  // Enhanced dummy inbox messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "Hostel Warden",
      to: "student@example.com",
      subject: "Room Allocation Confirmation - A-201",
      body: "Dear Student,\n\nYour room has been successfully allocated. Room Number: A-201\nFloor: 2nd Floor\nBlock: A Block\n\nPlease collect your keys from the reception desk during office hours (9 AM - 6 PM).\n\nWelcome to the hostel!\n\nBest regards,\nHostel Administration",
      timestamp: "2025-08-28T09:30:00",
      isRead: false,
      isStarred: true,
      isImportant: true,
      category: "Administrative",
      hasAttachment: false
    },
    {
      id: 2,
      from: "Mess Committee",
      to: "all-students@hostel.edu",
      subject: "Weekly Mess Menu Update - Special Dishes Added",
      body: "Dear Students,\n\nWe're excited to announce the updated weekly mess menu with some special regional dishes!\n\nNew additions this week:\n- South Indian Breakfast (Dosa, Idli)\n- North Indian Special (Rajma Rice)\n- Continental Evening Snacks\n\nMess timings remain the same:\nBreakfast: 7:00 AM - 9:00 AM\nLunch: 12:00 PM - 2:00 PM\nDinner: 7:00 PM - 9:00 PM\n\nFeedback is always welcome!\n\nMess Committee",
      timestamp: "2025-08-28T08:15:00",
      isRead: true,
      isStarred: false,
      isImportant: false,
      category: "Mess",
      hasAttachment: true
    },
    {
      id: 3,
      from: "Maintenance Team",
      to: "block-a-residents@hostel.edu",
      subject: "URGENT: Water Supply Maintenance Notice",
      body: "Dear Block A Residents,\n\nWe will be conducting essential water supply maintenance work tomorrow.\n\nScheduled Maintenance:\nDate: August 29, 2025\nTime: 6:00 AM - 8:00 AM\nAffected Areas: Block A (All floors)\n\nPlease store water in advance. We apologize for any inconvenience.\n\nFor emergencies, contact: +91-9876543210\n\nMaintenance Team",
      timestamp: "2025-08-27T16:45:00",
      isRead: false,
      isStarred: false,
      isImportant: true,
      category: "Maintenance"
    },
    {
      id: 4,
      from: "Student Council",
      to: "all-students@hostel.edu",
      subject: "Annual Sports Day - Registration Open",
      body: "Dear Fellow Students,\n\nGet ready for our Annual Sports Day 2025!\n\nEvent Date: September 15, 2025\nVenue: University Sports Complex\nRegistration Deadline: September 5, 2025\n\nEvents include:\n- Cricket Tournament\n- Football Championship\n- Basketball League\n- Track & Field\n- Indoor Games\n\nPrizes worth ₹50,000 to be won!\n\nRegister now: sports.hostel.edu\n\nSee you on the field!\nStudent Council",
      timestamp: "2025-08-26T14:20:00",
      isRead: true,
      isStarred: true,
      isImportant: false,
      category: "Events"
    },
    {
      id: 5,
      from: "Security Office",
      to: "all-students@hostel.edu",
      subject: "New Visitor Policy Guidelines",
      body: "Dear Students,\n\nWe have updated our visitor policy for better security:\n\n1. All visitors must register at the main gate\n2. Valid ID proof required\n3. Visiting hours: 10 AM - 6 PM\n4. Overnight stays require prior approval\n5. Maximum 2 visitors per student at a time\n\nPlease inform your guests about these guidelines.\n\nSecurity Office\nContact: security@hostel.edu",
      timestamp: "2025-08-25T11:30:00",
      isRead: true,
      isStarred: false,
      isImportant: false,
      category: "Security"
    }
  ]);

  const handleSend = () => {
    if (!formData.to || !formData.subject || !formData.body) {
      alert("All fields are required!");
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      from: "You",
      to: formData.to,
      subject: formData.subject,
      body: formData.body,
      timestamp: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      isImportant: false,
      category: "Sent"
    };

    setMessages(prev => [newMessage, ...prev]);
    setFormData({ to: "", subject: "", body: "" });
    setIsComposeOpen(false);
  };

  const toggleStarred = (id: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const markAsRead = (id: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
    setSelectedMessage(id);
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    if (selectedMessage === id) {
      setSelectedMessage(null);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Administrative": "bg-blue-100 text-blue-800",
      "Mess": "bg-green-100 text-green-800",
      "Maintenance": "bg-red-100 text-red-800",
      "Events": "bg-purple-100 text-purple-800",
      "Security": "bg-orange-100 text-orange-800",
      "Sent": "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.from.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || msg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(messages.map(msg => msg.category)))];
  const unreadCount = messages.filter(msg => !msg.isRead).length;

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white/80 backdrop-blur-sm flex flex-col shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-xl">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hostel Inbox</h1>
                <p className="text-sm text-gray-600">{unreadCount} unread messages</p>
              </div>
            </div>
            <button
              onClick={() => setIsComposeOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => markAsRead(msg.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedMessage === msg.id ? "bg-blue-50 border-blue-200" : ""
              } ${!msg.isRead ? "bg-blue-25" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${!msg.isRead ? "bg-blue-500" : "bg-gray-300"}`} />
                  <p className={`font-medium text-gray-900 truncate ${!msg.isRead ? "font-bold" : ""}`}>
                    {msg.from}
                  </p>
                  {msg.isImportant && <Bell className="w-4 h-4 text-red-500 flex-shrink-0" />}
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStarred(msg.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Star className={`w-4 h-4 ${msg.isStarred ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(msg.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className={`text-sm mb-1 truncate ${!msg.isRead ? "font-semibold text-gray-900" : "text-gray-800"}`}>
                {msg.subject}
              </h3>
              
              <p className="text-sm text-gray-600 truncate mb-2">{msg.body}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(msg.category)}`}>
                    {msg.category}
                  </span>
                  {msg.hasAttachment && (
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(msg.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
          
          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No messages found</p>
            </div>
          )}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {selectedMessageData ? (
          <>
            {/* Message Header */}
            <div className="p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessageData.subject}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>From: {selectedMessageData.from}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(selectedMessageData.timestamp).toLocaleString()}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(selectedMessageData.category)}`}>
                      <Tag className="w-3 h-3 inline mr-1" />
                      {selectedMessageData.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Reply className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Forward className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
              <div className="max-w-4xl">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                    {selectedMessageData.body}
                  </pre>
                </div>
                
                {selectedMessageData.hasAttachment && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <Paperclip className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Attachment</p>
                        <p className="text-xs text-blue-700">menu-update.pdf (245 KB)</p>
                      </div>
                      <button className="ml-auto px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Mail className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a message to read</h3>
              <p className="text-gray-500">Choose a message from the inbox to view its contents</p>
            </div>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
              <h2 className="text-xl font-bold text-gray-900">Compose New Message</h2>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  To <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="recipient@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter subject line"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={8}
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelInbox;