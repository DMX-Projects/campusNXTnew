import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Search, 
  Filter, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward, 
  MoreVertical,
  Paperclip,
  Calendar,
  User,
  GraduationCap,
  Users,
  Settings,
  RefreshCw,
  ChevronDown,
  Eye,
  EyeOff,
  DollarSign,
  FileText,
  AlertTriangle,
  BookOpen,
  Trophy,
  Heart,
  Phone,
  Clock,
  Plus
} from 'lucide-react';

const ParentInbox = () => {
  const [selectedMails, setSelectedMails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMail, setSelectedMail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);

function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
  event.preventDefault();
  // You can collect form data here if you use state for each field.
  // For now, just close the modal and show a success message.
  alert('Ticket submitted successfully!');
  // Optionally, reset form fields if you use state.
  // Hide the compose modal.
  setShowCompose(false);
}



  // Current parent user data
  const [currentParent] = useState({
    id: 'parent_001',
    name: 'Mrs. Sunita Patel',
    email: 'sunita.patel@gmail.com',
    phone: '+91-9876543210',
    children: [
      {
        id: 'student_2021cs001',
        name: 'Arjun Patel',
        rollNumber: '2021CS001',
        department: 'Computer Science Engineering',
        year: '4th Year',
        semester: '8th Semester'
      }
    ]
  });

  // Mock mail data for parents
  const [mails, setMails] = useState([
    {
      id: 1,
      senderId: 'academic_office',
      senderName: 'Academic Office',
      senderType: 'admin',
      department: 'Academic Affairs',
      subject: 'Mid-Semester Examination Results - Arjun Patel (2021CS001)',
      body: 'Dear Mrs. Patel,\n\nWe are pleased to inform you about your ward Arjun Patel\'s mid-semester examination results:\n\nData Structures: A (85%)\nAlgorithms: B+ (78%)\nDatabase Systems: A- (82%)\nSoftware Engineering: A (88%)\nOverall CGPA: 8.2/10\n\nYour ward is performing excellently. Keep encouraging the good work!\n\nFor detailed marks breakdown, please login to the parent portal.\n\nRegards,\nAcademic Office',
      timestamp: '2024-11-15T10:30:00Z',
      isRead: false,
      isStarred: true,
      priority: 'high',
      mailType: 'academic',
      attachments: [{ name: 'arjun_midterm_results.pdf', size: '156KB' }],
      studentId: 'student_2021cs001',
      tags: ['results', 'academic_performance'],
      replyTo: 'academic.office@college.edu'
    },
    {
      id: 2,
      senderId: 'accounts_dept',
      senderName: 'Accounts Department',
      senderType: 'admin',
      department: 'Finance',
      subject: 'Fee Payment Confirmation - Semester 8 (Arjun Patel)',
      body: 'Dear Parent,\n\nWe acknowledge the receipt of semester fee payment for your ward Arjun Patel (2021CS001).\n\nPayment Details:\nAmount Paid: ₹75,000\nTransaction ID: TXN789456123\nPayment Date: November 10, 2024\nPayment Mode: Online\n\nReceipt has been generated and sent to your registered email. Hostel fee for next semester is due by December 15th, 2024.\n\nThank you for timely payment.\n\nRegards,\nAccounts Department',
      timestamp: '2024-11-10T16:45:00Z',
      isRead: true,
      isStarred: false,
      priority: 'medium',
      mailType: 'financial',
      attachments: [{ name: 'fee_receipt_nov2024.pdf', size: '245KB' }],
      studentId: 'student_2021cs001',
      tags: ['fee_payment', 'receipt'],
      replyTo: 'accounts@college.edu'
    },
    {
      id: 3,
      senderId: 'placement_cell',
      senderName: 'Training & Placement Cell',
      senderType: 'admin',
      department: 'Placement',
      subject: 'Placement Update - Your Ward Selected in TechCorp Solutions',
      body: 'Dear Mrs. Patel,\n\nCongratulations! We are delighted to inform you that your ward Arjun Patel has been SELECTED in the campus placement drive conducted by TechCorp Solutions.\n\nJob Details:\nPosition: Software Developer\nPackage: ₹12 LPA\nJoining Date: July 2025\nLocation: Bangalore\n\nOffer letter will be shared within 3-5 working days. This is a remarkable achievement and we congratulate both you and Arjun.\n\nFor any queries, please contact the placement office.\n\nBest regards,\nPlacement Team',
      timestamp: '2024-11-08T11:20:00Z',
      isRead: false,
      isStarred: true,
      priority: 'high',
      mailType: 'placement',
      attachments: [],
      studentId: 'student_2021cs001',
      tags: ['placement', 'job_offer', 'congratulations'],
      replyTo: 'placement@college.edu'
    },
    {
      id: 4,
      senderId: 'hostel_warden',
      senderName: 'Hostel Warden - Block A',
      senderType: 'staff',
      department: 'Student Affairs',
      subject: 'Hostel Room Inspection Report - Room A-204',
      body: 'Dear Parent,\n\nThis is to inform you about the monthly hostel room inspection for your ward Arjun Patel (Room A-204).\n\nInspection Date: November 5, 2024\nRoom Condition: Good\nCleanliness: Satisfactory\nFurniture Status: All items in good condition\n\nRecommendations:\n- Encourage regular room cleaning\n- Replace study table lamp (flickering)\n\nOverall, your ward is maintaining the room well. No major concerns.\n\nRegards,\nWarden - Block A',
      timestamp: '2024-11-05T14:30:00Z',
      isRead: true,
      isStarred: false,
      priority: 'low',
      mailType: 'hostel',
      attachments: [{ name: 'room_inspection_report.pdf', size: '89KB' }],
      studentId: 'student_2021cs001',
      tags: ['hostel', 'inspection', 'room_status'],
      replyTo: 'warden.blocka@college.edu'
    },
    {
      id: 5,
      senderId: 'class_teacher',
      senderName: 'Prof. Dr. Meera Singh (Class Teacher)',
      senderType: 'faculty',
      department: 'Computer Science',
      subject: 'Monthly Progress Report - October 2024',
      body: 'Dear Mrs. Patel,\n\nI hope this message finds you in good health. Here is the monthly progress report for Arjun Patel:\n\nAttendance: 92% (Excellent)\nClass Participation: Very Active\nAssignment Submission: All on time\nBehavior: Excellent\nPeer Interaction: Good leadership qualities\n\nAcademic Performance:\n- Strong in programming subjects\n- Shows innovation in project work\n- Needs slight improvement in theoretical subjects\n\nRecommendations:\n- Continue the excellent work\n- Focus more on theory preparation for finals\n\nPlease feel free to contact me for any discussion about Arjun\'s progress.\n\nWarm regards,\nProf. Dr. Meera Singh',
      timestamp: '2024-11-01T09:15:00Z',
      isRead: false,
      isStarred: false,
      priority: 'medium',
      mailType: 'academic',
      attachments: [],
      studentId: 'student_2021cs001',
      tags: ['progress_report', 'monthly_update', 'class_teacher'],
      replyTo: 'meera.singh@college.edu'
    },
    {
      id: 6,
      senderId: 'medical_center',
      senderName: 'College Medical Center',
      senderType: 'staff',
      department: 'Healthcare',
      subject: 'Medical Check-up Reminder - Annual Health Assessment',
      body: 'Dear Parent,\n\nThis is a reminder for your ward\'s annual medical check-up scheduled at our college medical center.\n\nStudent: Arjun Patel (2021CS001)\nScheduled Date: November 25, 2024\nTime: 10:00 AM - 12:00 PM\nVenue: Medical Center, Ground Floor\n\nRequired Documents:\n- Previous medical records\n- Vaccination certificates\n- Health insurance details\n\nIn case of any chronic conditions or allergies, please inform us beforehand.\n\nRegards,\nCollege Medical Team',
      timestamp: '2024-10-28T13:45:00Z',
      isRead: true,
      isStarred: false,
      priority: 'medium',
      mailType: 'medical',
      attachments: [{ name: 'health_checkup_guidelines.pdf', size: '178KB' }],
      studentId: 'student_2021cs001',
      tags: ['medical', 'checkup', 'health'],
      replyTo: 'medical@college.edu'
    },
    {
      id: 7,
      senderId: 'transport_office',
      senderName: 'Transport Office',
      senderType: 'admin',
      department: 'Transport',
      subject: 'Bus Route Change Notification - Route 15',
      body: 'Dear Parents,\n\nDue to ongoing road construction work on the main highway, we are temporarily modifying Bus Route 15 which serves the following areas: Satellite, Vastrapur, and nearby locations.\n\nEffective Date: November 18, 2024\nNew Pick-up Points:\n- Satellite: 7:45 AM (Gujarat High Court)\n- Vastrapur: 8:00 AM (ISRO Signal)\n\nReturn timings remain unchanged. This is a temporary arrangement for 2 weeks.\n\nFor any concerns, contact transport office.\n\nRegards,\nTransport Department',
      timestamp: '2024-10-25T08:30:00Z',
      isRead: true,
      isStarred: false,
      priority: 'medium',
      mailType: 'transport',
      attachments: [],
      studentId: 'student_2021cs001',
      tags: ['transport', 'route_change', 'notification'],
      replyTo: 'transport@college.edu'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Messages', icon: Mail },
    { value: 'unread', label: 'Unread', icon: Eye },
    { value: 'starred', label: 'Starred', icon: Star },
    { value: 'academic', label: 'Academic Updates', icon: GraduationCap },
    { value: 'financial', label: 'Fee & Payments', icon: DollarSign },
    { value: 'placement', label: 'Placement News', icon: Trophy },
    { value: 'hostel', label: 'Hostel Updates', icon: Users },
    { value: 'medical', label: 'Health & Medical', icon: Heart },
    { value: 'transport', label: 'Transport', icon: Calendar }
  ];

  const priorityColors = {
    high: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    low: 'text-green-600 bg-green-50 border-green-200'
  };

  const senderTypeIcons = {
    admin: Settings,
    faculty: GraduationCap,
    staff: User
  };

  const mailTypeColors = {
    academic: 'bg-blue-100 text-blue-800',
    financial: 'bg-green-100 text-green-800',
    placement: 'bg-purple-100 text-purple-800',
    hostel: 'bg-orange-100 text-orange-800',
    medical: 'bg-red-100 text-red-800',
    transport: 'bg-indigo-100 text-indigo-800'
  };

  const filteredMails = mails.filter(mail => {
    const matchesSearch = mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mail.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mail.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'unread' && !mail.isRead) ||
                         (selectedFilter === 'starred' && mail.isStarred) ||
                         (selectedFilter !== 'unread' && selectedFilter !== 'starred' && mail.mailType === selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  const toggleMailSelection = (mailId) => {
    setSelectedMails(prev => 
      prev.includes(mailId) 
        ? prev.filter(id => id !== mailId)
        : [...prev, mailId]
    );
  };

  const toggleStarred = (mailId) => {
    setMails(prev => prev.map(mail => 
      mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail
    ));
  };

  const markAsRead = (mailId) => {
    setMails(prev => prev.map(mail => 
      mail.id === mailId ? { ...mail, isRead: true } : mail
    ));
  };

  const markAsUnread = (mailId) => {
    setMails(prev => prev.map(mail => 
      mail.id === mailId ? { ...mail, isRead: false } : mail
    ));
  };

  const deleteMail = (mailId) => {
    setMails(prev => prev.filter(mail => mail.id !== mailId));
    setSelectedMail(null);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const unreadCount = mails.filter(mail => !mail.isRead).length;

  const ComposeModal = () => (
  showCompose && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Raise Ticket</h3>
          <button 
            onClick={() => setShowCompose(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {/* Form Fields in bordered cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
                <option>Select Ticket Type</option>
                <option>Hostel</option>
                <option>Transport</option>
                <option>Library</option>
                <option>Academic</option>
                <option>Examination</option>
              </select>
            </div>

            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-1">Child Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter child's name"
              />
            </div>

            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter parent name"
              />
            </div>

            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter roll number"
              />
            </div>

            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter subject"
              />
            </div>

            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
                <option value="academic">Computer Science Engineering</option>
                <option value="electronics">Electronics & Communication</option>
                <option value="mechanical">Mechanical Engineering</option>
                <option value="ai">Artificial Intelligence</option>
              </select>
            </div>

            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>

          </div>

          {/* Attach & Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            
            <div className="flex gap-2 ">
              <button 
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);


  const MailDetailModal = () => (
    selectedMail && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900">{selectedMail.subject}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[selectedMail.priority]}`}>
                  {selectedMail.priority.toUpperCase()}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${mailTypeColors[selectedMail.mailType]}`}>
                  {selectedMail.mailType.toUpperCase()}
                </span>
              </div>
              <button 
                onClick={() => setSelectedMail(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {React.createElement(senderTypeIcons[selectedMail.senderType], { size: 24, className: "text-blue-600" })}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{selectedMail.senderName}</div>
                  <div className="text-sm text-gray-600">{selectedMail.department}</div>
                  <div className="text-xs text-gray-500">
                    Regarding: {currentParent.children.find(child => child.id === selectedMail.studentId)?.name} 
                    ({currentParent.children.find(child => child.id === selectedMail.studentId)?.rollNumber})
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    {new Date(selectedMail.timestamp).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              
              {selectedMail.attachments.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Attachments:</div>
                  {selectedMail.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                      <Paperclip size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700 flex-1">{attachment.name}</span>
                      <span className="text-xs text-gray-500">({attachment.size})</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-md">
                {selectedMail.body}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4 border-t">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Reply size={16} />
                Reply
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                <Forward size={16} />
                Forward
              </button>
              <button 
                onClick={() => toggleStarred(selectedMail.id)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                  selectedMail.isStarred 
                    ? 'border-yellow-300 text-yellow-600 bg-yellow-50' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Star size={16} />
                {selectedMail.isStarred ? 'Unstar' : 'Star'}
              </button>
              <button 
                onClick={() => deleteMail(selectedMail.id)}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Parent Portal - Inbox</h1>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-gray-600">
                {currentParent.name} | {currentParent.email}
              </p>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowCompose(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={16} />
                 Raise Ticket
            </button>       
 
   <button className="p-2 text-gray-600 hover:text-gray-800">
              <RefreshCw size={20} />
            </button>
          </div>
          
        </div>
        
      </div>
      

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Student Info Card */}
          <div className="p-4 border-b border-gray-200 bg-blue-50">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Your Ward</h3>
            {currentParent.children.map(child => (
              <div key={child.id} className="bg-white p-3 rounded-md shadow-sm">
                <div className="font-medium text-gray-900">{child.name}</div>
                <div className="text-sm text-gray-600">{child.rollNumber}</div>
                <div className="text-xs text-gray-500">{child.department}</div>
                <div className="text-xs text-gray-500">{child.year} - {child.semester}</div>
              </div>
            ))}
          </div>

          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Message Categories
              </h3>
              <div className="space-y-1">
                {filterOptions.map((filter) => {
                  const count = filter.value === 'all' 
                    ? mails.length 
                    : filter.value === 'unread'
                    ? mails.filter(m => !m.isRead).length
                    : filter.value === 'starred'
                    ? mails.filter(m => m.isStarred).length
                    : mails.filter(m => m.mailType === filter.value).length;
                    
                  return (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedFilter(filter.value)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedFilter === filter.value
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {React.createElement(filter.icon, { size: 16 })}
                      <span className="flex-1 text-left">{filter.label}</span>
                      {count > 0 && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedFilter === filter.value
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Quick Links
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                <FileText size={14} />
                Fee Portal
              </button>
              <button className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                <BookOpen size={14} />
                Academic Portal
              </button>
              <button className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                <Calendar size={14} />
                Academic Calendar
              </button>
              <button className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                <Phone size={14} />
                Emergency Contacts
              </button>
            </div>
          </div>
        </div>

        {/* Mail List */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {filteredMails.length} messages
                </span>
                {selectedMails.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-600">
                      {selectedMails.length} selected
                    </span>
                    <button 
                      onClick={() => {
                        selectedMails.forEach(id => markAsRead(id));
                        setSelectedMails([]);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark as Read
                    </button>
                    <button 
                      onClick={() => {
                        selectedMails.forEach(id => deleteMail(id));
                        setSelectedMails([]);
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Sort by: Latest First
                </span>
                <button className="p-2 text-gray-600 hover:text-gray-800">
                  <Filter size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Mail List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMails.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Mail size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No messages found</p>
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredMails.map((mail) => {
                  const SenderIcon = senderTypeIcons[mail.senderType];
                  const studentInfo = currentParent.children.find(child => child.id === mail.studentId);
                  
                  return (
                    <div
                      key={mail.id}
                      className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !mail.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-white'
                      } ${selectedMails.includes(mail.id) ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                      onClick={() => {
                        setSelectedMail(mail);
                        markAsRead(mail.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMails.includes(mail.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleMailSelection(mail.id);
                        }}
                        className="rounded border-gray-300"
                      />
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStarred(mail.id);
                        }}
                        className={`p-1 rounded ${mail.isStarred ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'}`}
                      >
                        <Star size={16} fill={mail.isStarred ? 'currentColor' : 'none'} />
                      </button>

                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <SenderIcon size={20} className="text-blue-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-medium ${!mail.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {mail.senderName}
                          </span>
                          <span className="text-xs text-gray-500">
                            • {mail.department}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${mailTypeColors[mail.mailType]}`}>
                            {mail.mailType}
                          </span>
                        </div>
                        
                        <div className={`text-sm mb-1 ${!mail.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {mail.subject}
                        </div>
                        
                        <div className="text-sm text-gray-600 truncate mb-2">
                          {mail.body.split('\n')[0]}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <User size={12} />
                          <span>Re: {studentInfo?.name} ({studentInfo?.rollNumber})</span>
                          {mail.attachments.length > 0 && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Paperclip size={12} />
                                {mail.attachments.length} attachment{mail.attachments.length > 1 ? 's' : ''}
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 mt-2">
                          {mail.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-2">
                        <div className="text-sm text-gray-500">
                          {formatTimestamp(mail.timestamp)}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[mail.priority]}`}>
                            {mail.priority}
                          </span>
                          {!mail.isRead && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              mail.isRead ? markAsUnread(mail.id) : markAsRead(mail.id);
                            }}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            {mail.isRead ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMail(mail.id);
                            }}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Summary */}
          <div className="bg-white border-t border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                Total: {mails.length} messages
              </div>
              <div className="flex items-center gap-4">
                <span>Unread: {unreadCount}</span>
                <span>Starred: {mails.filter(m => m.isStarred).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      {mails.some(mail => mail.priority === 'high' && !mail.isRead) && (
        <div className="bg-red-50 border-t border-red-200 px-6 py-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-600" />
            <span className="text-sm text-red-800">
              You have urgent messages from the college. Please check immediately.
            </span>
            <button className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium">
              View Urgent
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ComposeModal />
      <MailDetailModal />
    </div>
  );
};

export default ParentInbox;



