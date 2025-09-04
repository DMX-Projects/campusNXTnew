import React, { useState } from 'react';
import { Mail, Clock, AlertCircle, CheckCircle, X, Send, Paperclip, Image, Trash2, Atom } from 'lucide-react';

// Mock data with college and matter transportation themes
const inboxMessages = [
  {
    id: 1,
    from: 'Campus Transportation',
    subject: 'New Campus Shuttle Routes for Fall Semester',
    preview: 'We are excited to announce new shuttle routes connecting dormitories to academic buildings. Route maps and schedules attached...',
    date: '2025-08-28',
    priority: 'medium',
    isRead: false,
    avatar: 'CT'
  },
  {
    id: 2,
    from: 'University Parking Services',
    subject: 'Student Parking Permits - Registration Deadline',
    preview: 'Reminder: Student parking permit registration deadline is September 5th. Reserve your spot in campus lots and avoid daily parking fees...',
    date: '2025-08-27',
    priority: 'high',
    isRead: false,
    avatar: 'PS'
  },
  {
    id: 3,
    from: 'Quantum Research Lab',
    subject: 'Breakthrough in Quantum Teleportation Protocols',
    preview: 'We have successfully achieved quantum state transfer over 100km using entangled photons. The matter transportation implications are significant...',
    date: '2025-08-26',
    priority: 'high',
    isRead: false,
    avatar: 'QR'
  },
  {
    id: 4,
    from: 'Student Transit Authority',
    subject: 'Metro Card Discounts for College Students',
    preview: 'Apply now for discounted metro cards! Students save 50% on monthly passes. Valid student ID required for verification...',
    date: '2025-08-26',
    priority: 'medium',
    isRead: true,
    avatar: 'ST'
  },
  {
    id: 5,
    from: 'Teleportation Institute',
    subject: 'Molecular Disassembly Conference - Registration Open',
    preview: 'Join us for the annual conference on molecular disassembly and reassembly techniques. Featured topics include quantum entanglement, matter stream encoding...',
    date: '2025-08-25',
    priority: 'medium',
    isRead: false,
    avatar: 'TI'
  },
  {
    id: 6,
    from: 'Ride Share Program',
    subject: 'Find Your Perfect Carpool Match!',
    preview: 'Connect with students traveling your route! Our new matching system pairs you with compatible riders based on schedule and location...',
    date: '2025-08-25',
    priority: 'low',
    isRead: false,
    avatar: 'RS'
  },
  {
    id: 7,
    from: 'Physics Department',
    subject: 'New Theory on Matter Phase Transitions',
    preview: 'Prof. Anderson has published groundbreaking research on controlled matter phase transitions for transportation applications...',
    date: '2025-08-24',
    priority: 'medium',
    isRead: false,
    avatar: 'PD'
  },
  {
    id: 8,
    from: 'Campus Security',
    subject: 'Safe Transportation Tips for Night Students',
    preview: 'Important safety guidelines for students traveling to and from campus during evening hours. Emergency contact numbers and escort services...',
    date: '2025-08-24',
    priority: 'high',
    isRead: true,
    avatar: 'CS'
  },
  {
    id: 9,
    from: 'Starfleet Academy',
    subject: 'Transporter Technology Safety Protocols',
    preview: 'Updated safety guidelines for matter transportation devices. Critical updates on pattern buffer integrity and molecular resolution scanning...',
    date: '2025-08-23',
    priority: 'high',
    isRead: true,
    avatar: 'SA'
  },
  {
    id: 10,
    from: 'Bike Share Program',
    subject: 'New E-Bike Stations Around Campus',
    preview: 'Exciting news! We have installed 5 new e-bike stations across campus. Download our app to locate and reserve bikes instantly...',
    date: '2025-08-22',
    priority: 'low',
    isRead: false,
    avatar: 'BS'
  }
];

const sentMessages = [
  {
    id: 11,
    to: 'transport@university.edu',
    subject: 'Request for Additional Evening Shuttle Service',
    preview: 'Dear Transportation Team, I would like to request additional shuttle service during evening hours for students attending night classes...',
    date: '2025-08-26',
    priority: 'medium',
    isRead: true,
    avatar: 'TU'
  },
  {
    id: 12,
    to: 'research@quantumlab.org',
    subject: 'Proposal: Enhanced Matter Buffer Systems',
    preview: 'Dear colleagues, I am submitting a proposal for enhanced matter buffer systems that could increase transportation range by 300%...',
    date: '2025-08-25',
    priority: 'high',
    isRead: true,
    avatar: 'QL'
  },
  {
    id: 13,
    to: 'parking@campus.edu',
    subject: 'Student Parking Concerns - Lot B Overcrowding',
    preview: 'I am writing to address the ongoing parking issues in Lot B. Students are frequently unable to find spaces despite having valid permits...',
    date: '2025-08-24',
    priority: 'medium',
    isRead: true,
    avatar: 'PC'
  },
  {
    id: 14,
    to: 'ethics@teleportation.gov',
    subject: 'Ethical Considerations in Human Transportation',
    preview: 'The philosophical implications of disassembling and reassembling human consciousness during matter transportation require careful consideration...',
    date: '2025-08-23',
    priority: 'medium',
    isRead: true,
    avatar: 'ET'
  },
  {
    id: 15,
    to: 'rideshare@studentunion.org',
    subject: 'Application to Join Campus Carpool Program',
    preview: 'Hello, I would like to apply for the campus carpool program. I commute from downtown and am looking for reliable transportation partners...',
    date: '2025-08-22',
    priority: 'low',
    isRead: true,
    avatar: 'SU'
  },
  {
    id: 16,
    to: 'funding@sciencefoundation.org',
    subject: 'Grant Application: Quantum Matter Stabilization',
    preview: 'Requesting funding for research into quantum matter stabilization during transportation. Project aims to solve decoherence issues...',
    date: '2025-08-21',
    priority: 'high',
    isRead: true,
    avatar: 'SF'
  }
];

function MessageDetail({ message, onClose }) {
  const getFullContent = (msg) => {
    const contentMap = {
      1: `Dear Students,

We are excited to announce the implementation of new campus shuttle routes for the Fall 2025 semester!

New Routes Include:
• North Campus Express: Connecting all dormitories to Science Complex
• Library Loop: Quick access from residential areas to Main Library
• Athletic Center Direct: Dedicated service to gym and sports facilities
• Evening Safety Shuttle: Extended hours until 2 AM for night students

Schedule Updates:
- Shuttles run every 10 minutes during peak hours (8 AM - 6 PM)
- Every 20 minutes during off-peak hours
- Weekend service available with modified schedule
- Real-time tracking available via CampusTransit app

Safety Features:
• All shuttles equipped with GPS tracking
• Emergency communication systems
• Well-lit shuttle stops with security cameras
• Wheelchair accessible vehicles on all routes

Download the CampusTransit app to:
- View real-time bus locations
- Get arrival predictions
- Report issues or suggestions
- Access route maps and schedules

The new routes will begin operating on September 1st. We appreciate your patience during the transition period.

Safe travels!
Campus Transportation Services`,

      2: `IMPORTANT REMINDER: Student Parking Permits

Dear Students,

This is a final reminder that parking permit registration closes on September 5th, 2025.

Available Permit Types:
• Residential Lots (A-F): $150/semester
• Commuter Lots (G-K): $100/semester  
• Premium Lots (Near Academic Buildings): $200/semester
• Evening Only (After 5 PM): $50/semester

Registration Process:
1. Log into Student Portal
2. Navigate to Parking Services
3. Upload current student ID and vehicle registration
4. Select preferred lot (subject to availability)
5. Complete payment online

Important Notes:
- Permits are non-transferable between students
- Daily parking fees are $10 without a valid permit
- Appeals for parking violations must be submitted within 10 days
- Motorcycle permits available at 50% discount

Limited spaces remain in popular lots near the Engineering and Business buildings. Register early to secure your preferred location.

Questions? Visit our office in the Student Services Building or call (555) 123-PARK.

University Parking Services
Student Life Division`,

      3: `Dear Research Team,

We are thrilled to announce a revolutionary breakthrough in quantum teleportation protocols. Our team has successfully achieved quantum state transfer over a distance of 100 kilometers using entangled photons.

Key Achievements:
• Maintained quantum coherence for 99.7% of transmissions
• Successfully teleported complex molecular structures
• Developed new error correction algorithms for matter streams
• Achieved sub-atomic precision in molecular reconstruction

The implications for matter transportation are profound. We are now closer than ever to practical teleportation of complex organic matter.

Next Steps:
1. Scale testing to larger molecular structures
2. Implement biological safety protocols
3. Begin preliminary tests with simple organisms

Please review the attached research data and provide feedback by end of week.

Best regards,
Dr. Sarah Chen
Quantum Research Lab`,

      4: `Student Metro Card Discount Program

Dear Students,

Great news! The Student Transit Authority has partnered with Metro Transit to offer significant savings on public transportation.

Discount Details:
• 50% off monthly metro passes
• Valid on all bus and train routes
• Unlimited rides within the metro system
• Special weekend and holiday rates

How to Apply:
1. Visit any metro station with valid student ID
2. Complete the student verification form
3. Provide current enrollment verification
4. Photo will be taken for your discounted card

Monthly Pass Prices (Student Rate):
- Local Routes: $35 (Regular: $70)
- Express Routes: $45 (Regular: $90) 
- All-Access Pass: $55 (Regular: $110)

Additional Benefits:
• Free transfers between bus and rail
• Mobile app with real-time schedules
• Lost card replacement at no cost
• Valid at all partner transit systems

The program runs throughout the academic year and must be renewed each semester. Cards can be loaded with funds at any metro station or online.

Start saving on your daily commute today!

Student Transit Authority
Metro Partnership Program`,

      9: `URGENT: Updated Safety Protocols for Matter Transportation

All personnel operating transporter technology must review these critical updates:

NEW SAFETY REQUIREMENTS:
1. Pattern Buffer Integrity Checks
   - Perform molecular resolution scans before each transport
   - Verify quantum signature accuracy to 99.9%
   - Check for pattern degradation every 30 minutes

2. Biological Safety Measures
   - No transportation of pregnant individuals
   - 24-hour waiting period between transports
   - Medical clearance required for those with implants

3. Emergency Procedures
   - In case of pattern lock failure, activate emergency materialization
   - Use backup molecular pattern storage for reconstruction
   - Quarantine area for incomplete materializations

Recent Incidents:
- Three cases of molecular drift in the past month
- One instance of incomplete materialization (resolved)
- Pattern buffer overflow at Station 7

Remember: The safety of conscious beings during matter transportation is our highest priority.

Commander Data
Starfleet Academy Safety Division`
    };
    
    return contentMap[msg.id] || msg.preview;
  };

  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{message.subject}</h2>
            <p className="text-sm text-gray-600">From: {message.from || `To: ${message.to}`} • {message.date}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
              {getFullContent(message)}
            </pre>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComposeMail({ isOpen, onClose, onSend }) {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const [attachments, setAttachments] = useState([]);

  const handleSubmit = () => {
    if (!formData.to || !formData.subject || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    const messageWithAttachments = {
      ...formData,
      attachments: attachments,
      date: new Date().toISOString().split('T')[0],
      isRead: true
    };
    
    onSend(messageWithAttachments);
    setFormData({ to: '', subject: '', message: '', priority: 'medium' });
    setAttachments([]);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Please select an image under 5MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const newAttachment = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: event.target.result
        };
        
        setAttachments(prev => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });
    
    e.target.value = '';
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  };

  return (
    <div style={overlayStyle}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Compose Message</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="email"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="transport@university.edu"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Campus Transportation Inquiry"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Dear Transportation Services, I would like to inquire about..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Paperclip className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Attach File</span>
                </label>
                <span className="text-xs text-gray-500">Max 5MB per file</span>
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <img
                          src={attachment.preview}
                          alt={attachment.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(attachment.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeAttachment(attachment.id)}
                        className="flex-shrink-0 p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Mailbox() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [inboxMessageList, setInboxMessageList] = useState(inboxMessages);
  const [sentMessageList, setSentMessageList] = useState(sentMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50',
  };

  const currentMessages = activeTab === 'inbox' ? inboxMessageList : sentMessageList;
  const unreadCount = inboxMessageList.filter(msg => !msg.isRead).length;

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      to: messageData.to,
      subject: messageData.subject,
      preview: messageData.message.substring(0, 100) + '...',
      date: messageData.date,
      priority: messageData.priority,
      isRead: true,
      avatar: messageData.to.substring(0, 2).toUpperCase(),
      attachments: messageData.attachments
    };
    
    setSentMessageList(prev => [newMessage, ...prev]);
    
    const attachmentText = messageData.attachments && messageData.attachments.length > 0 
      ? ` with ${messageData.attachments.length} attachment(s)` 
      : '';
    alert(`Message sent to ${messageData.to} with subject: ${messageData.subject}${attachmentText}`);
  };

  const handleMessageClick = (message) => {
    if (activeTab === 'inbox') {
      setInboxMessageList(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, isRead: true } : msg
        )
      );
    }
    setSelectedMessage(message);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <h1 className="text-xl font-bold text-gray-800">Mail</h1>
            </div>
            
            <button 
              onClick={() => setIsComposeOpen(true)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-6 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Compose</span>
            </button>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('inbox')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'inbox' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Inbox</span>
                  {unreadCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('sent')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'sent' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sent
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'inbox' ? 'Inbox' : 'Sent Messages'}
                </h2>
                <p className="text-sm text-gray-600">
                  {activeTab === 'inbox' 
                    ? `${unreadCount} unread messages`
                    : `${sentMessageList.length} sent messages`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="divide-y divide-gray-200">
                {currentMessages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  currentMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => handleMessageClick(message)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !message.isRead && activeTab === 'inbox' ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {message.avatar}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium ${
                              !message.isRead && activeTab === 'inbox' 
                                ? 'text-gray-900 font-semibold' 
                                : 'text-gray-700'
                            }`}>
                              {message.from || `To: ${message.to}`}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[message.priority]}`}>
                                {message.priority}
                              </span>
                              <span className="text-xs text-gray-500">
                                {message.date}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className={`text-sm mb-1 ${
                            !message.isRead && activeTab === 'inbox' 
                              ? 'font-semibold text-gray-900' 
                              : 'text-gray-800'
                          }`}>
                            {message.subject}
                          </h3>
                          
                          <p className="text-sm text-gray-600 truncate">
                            {message.preview}
                          </p>
                        </div>
                        
                        {!message.isRead && activeTab === 'inbox' && (
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComposeMail 
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendMessage}
      />
      
      {selectedMessage && (
        <MessageDetail
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
}