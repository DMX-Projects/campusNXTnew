import React, { useState } from "react";
import { Mail, X, Send, Search, Star, Archive, Trash2, Reply, Forward, MoreHorizontal, Clock, User, Tag, Paperclip, Bell, Shield, AlertTriangle, FileText, Users, Building2, DollarSign, Settings, AlertCircle, Eye, CheckCircle, Download, TrendingUp } from "lucide-react";

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
  priority: "Low" | "Medium" | "High" | "Urgent";
  category: string;
  hasAttachment?: boolean;
  attachments?: string[];
  status?: "Pending" | "Approved" | "Rejected" | "Under Review";
  department?: string;
}

interface AdminUser {
  role: "Principal" | "Secretary" | "Chairperson";
  name: string;
  email: string;
}

const AdminHostelInbox: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [currentUser] = useState<AdminUser>({
    role: "Principal",
    name: "Dr. Rajesh Kumar",
    email: "principal@college.edu"
  });
  
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
    priority: "Medium" as "Low" | "Medium" | "High" | "Urgent",
    category: "Administrative"
  });

  // Enhanced admin-focused messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "Hostel Warden - Block A",
      to: "principal@college.edu",
      subject: "URGENT: Infrastructure Repair Request - Water Leakage Block A",
      body: "Dear Principal,\n\nWe are facing a critical infrastructure issue in Block A that requires immediate attention and budget approval.\n\nISSUE DETAILS:\n- Location: Block A, 3rd Floor, Rooms 301-315\n- Problem: Major water leakage from overhead tank\n- Impact: 15 rooms affected, students temporarily relocated\n- Estimated Cost: ₹2,50,000\n- Timeline: 5-7 working days\n\nIMMEDIATE ACTIONS REQUIRED:\n1. Budget approval for repair work\n2. Contractor selection approval\n3. Alternative accommodation arrangement approval\n\nThis is affecting 45 students and needs urgent resolution to maintain hostel operations.\n\nAttached: Quotations from 3 contractors, damage assessment report, photos\n\nPlease prioritize this request.\n\nRegards,\nDr. Suresh Sharma\nHostel Warden - Block A\nContact: +91-9876543210",
      timestamp: "2025-08-31T07:30:00",
      isRead: false,
      isStarred: true,
      isImportant: true,
      priority: "Urgent",
      category: "Infrastructure",
      hasAttachment: true,
      attachments: ["contractor_quotations.pdf", "damage_assessment.pdf", "photos.zip"],
      status: "Pending",
      department: "Hostel Administration"
    },
    {
      id: 2,
      from: "Finance Officer",
      to: "principal@college.edu",
      subject: "Monthly Hostel Financial Report - August 2025",
      body: "Dear Principal,\n\nPlease find the detailed monthly financial report for hostel operations.\n\nFINANCIAL SUMMARY - AUGUST 2025:\n\nREVENUE:\n- Room Rent Collections: ₹24,50,000\n- Mess Fee Collections: ₹18,75,000\n- Late Fee Collections: ₹45,000\n- Security Deposit: ₹2,25,000\nTotal Revenue: ₹45,95,000\n\nEXPENSES:\n- Staff Salaries: ₹8,50,000\n- Utilities (Electricity, Water): ₹6,75,000\n- Mess Operations: ₹15,25,000\n- Maintenance & Repairs: ₹3,45,000\n- Security Services: ₹2,15,000\n- Administrative Expenses: ₹1,25,000\nTotal Expenses: ₹37,35,000\n\nNET PROFIT: ₹8,60,000\n\nKEY HIGHLIGHTS:\n- 96.2% fee collection rate (improved from 94.1%)\n- Maintenance costs increased due to monsoon repairs\n- Occupancy rate: 91.7% (1247 out of 1360 beds)\n\nPENDING APPROVALS REQUIRED:\n1. Kitchen equipment upgrade - ₹4,50,000\n2. CCTV system enhancement - ₹2,25,000\n3. Generator replacement - Block C - ₹1,75,000\n\nDetailed breakdown attached for your review.\n\nBest regards,\nCA Priya Mehta\nFinance Officer",
      timestamp: "2025-08-31T06:45:00",
      isRead: false,
      isStarred: false,
      isImportant: true,
      priority: "High",
      category: "Financial",
      hasAttachment: true,
      attachments: ["monthly_financial_report.pdf", "expense_breakdown.xlsx"],
      status: "Under Review",
      department: "Finance"
    },
    {
      id: 3,
      from: "Dean Student Affairs",
      to: "principal@college.edu",
      subject: "Hostel Capacity Expansion Proposal - Academic Year 2025-26",
      body: "Dear Principal,\n\nWith the increasing student enrollment, we need to address the hostel accommodation shortage urgently.\n\nCURRENT SITUATION:\n- Total Applications: 1,650\n- Current Capacity: 1,360\n- Shortage: 290 beds\n- Waitlist: 178 students\n\nPROPOSED SOLUTIONS:\n\n1. IMMEDIATE (By December 2025):\n   - Convert common areas in Block D & E\n   - Add 60 additional beds\n   - Estimated Cost: ₹15,00,000\n\n2. SHORT-TERM (By June 2026):\n   - Construct new Block F\n   - Capacity: 320 beds\n   - Estimated Cost: ₹2,50,00,000\n   - Timeline: 8-10 months\n\n3. LONG-TERM (Academic Year 2026-27):\n   - Phase 2 expansion\n   - Additional 400 beds\n   - Estimated Cost: ₹3,20,00,000\n\nBENEFITS:\n- Accommodate all eligible students\n- Generate additional revenue: ₹1,44,00,000 annually\n- Improve student satisfaction\n- Competitive advantage in admissions\n\nFUNDING OPTIONS:\n- University Development Fund: 40%\n- Bank Loan: 35%\n- Student Fee Advance: 25%\n\nBoard meeting approval required by September 15, 2025.\n\nAttached: Detailed proposal, architectural plans, financial projections\n\nRegards,\nProf. Anjali Verma\nDean - Student Affairs",
      timestamp: "2025-08-30T16:20:00",
      isRead: true,
      isStarred: true,
      isImportant: true,
      priority: "High",
      category: "Strategic",
      hasAttachment: true,
      attachments: ["expansion_proposal.pdf", "architectural_plans.pdf", "financial_projections.xlsx"],
      status: "Under Review",
      department: "Student Affairs"
    },
    {
      id: 4,
      from: "Security Head",
      to: "principal@college.edu",
      subject: "Security Incident Report & Policy Update Recommendation",
      body: "Dear Principal,\n\nI am submitting the monthly security report and recommendations for policy updates.\n\nSECURITY INCIDENTS - AUGUST 2025:\n\n1. MINOR INCIDENTS (8 cases):\n   - Unauthorized entry attempts: 3\n   - Lost ID cards/keys: 3\n   - Minor altercations: 2\n   All resolved without escalation\n\n2. MODERATE INCIDENTS (2 cases):\n   - Theft complaint (Block B): Under investigation\n   - Medical emergency (Block A): Handled successfully\n\n3. POLICY VIOLATIONS (5 cases):\n   - Late night entry: 3 students\n   - Visitor policy violation: 2 cases\n   All cases handled as per existing protocols\n\nSECURITY ENHANCEMENTS IMPLEMENTED:\n- New CCTV cameras: 12 locations\n- Biometric access control: Block A & B\n- 24/7 security patrol schedule\n- Emergency response team training\n\nRECOMMENDED POLICY UPDATES:\n\n1. Visitor Management:\n   - Digital visitor registration system\n   - Background verification for overnight guests\n   - QR code-based entry system\n\n2. Emergency Protocols:\n   - Fire drill frequency: Monthly to bi-weekly\n   - Medical emergency response team\n   - Direct police station connectivity\n\n3. Technology Integration:\n   - Mobile app for security alerts\n   - Real-time incident reporting\n   - Parent notification system\n\nBUDGET REQUIREMENT:\n- Technology upgrades: ₹8,50,000\n- Additional security personnel: ₹3,60,000/month\n- Training programs: ₹1,25,000\n\nYour approval is requested for implementing these recommendations.\n\nRespectfully,\nInspector Vikram Singh\nSecurity Head\nContact: +91-9876543211",
      timestamp: "2025-08-30T14:15:00",
      isRead: true,
      isStarred: false,
      isImportant: false,
      priority: "Medium",
      category: "Security",
      hasAttachment: true,
      attachments: ["security_report_august.pdf", "incident_photos.zip"],
      status: "Approved",
      department: "Security"
    },
    {
      id: 5,
      from: "Mess Supervisor",
      to: "principal@college.edu",
      subject: "Food Quality Complaints & Vendor Contract Review",
      body: "Dear Principal,\n\nI need to bring to your attention some concerns regarding mess operations and vendor performance.\n\nRECENT COMPLAINTS (Last 15 days):\n- Food quality issues: 23 complaints\n- Hygiene concerns: 8 complaints\n- Menu variety requests: 15 suggestions\n- Portion size complaints: 12 cases\n\nSTUDENT FEEDBACK ANALYSIS:\n- Overall satisfaction: 3.2/5.0 (declined from 3.8/5.0)\n- Most complained items: Breakfast items, evening snacks\n- Most appreciated: Lunch variety, dinner quality\n\nVENDOR PERFORMANCE ISSUES:\n1. ABC Catering Services:\n   - Delayed deliveries: 8 instances\n   - Quality inconsistency: Multiple complaints\n   - Contract value: ₹12,00,000/month\n\n2. Fresh Foods Ltd:\n   - Good performance overall\n   - Pricing 15% higher than ABC\n   - Contract expires: December 2025\n\nRECOMMENDATIONS:\n\n1. IMMEDIATE ACTIONS:\n   - Issue warning notice to ABC Catering\n   - Increase quality inspection frequency\n   - Student feedback system enhancement\n\n2. CONTRACT REVIEW:\n   - Evaluate alternative vendors\n   - Renegotiate quality parameters\n   - Include penalty clauses for poor performance\n\n3. INFRASTRUCTURE UPGRADES:\n   - Kitchen equipment modernization: ₹6,50,000\n   - Storage facility improvement: ₹2,25,000\n   - Dining hall renovation: ₹4,75,000\n\nSTUDENT COMMITTEE MEETING:\nScheduled for September 5, 2025, to discuss improvements and gather more feedback.\n\nYour guidance is needed on vendor contract decisions and budget approvals.\n\nBest regards,\nRaman Gupta\nMess Supervisor\nContact: +91-9876543212",
      timestamp: "2025-08-30T11:30:00",
      isRead: false,
      isStarred: false,
      isImportant: true,
      priority: "High",
      category: "Operations",
      hasAttachment: true,
      attachments: ["complaint_summary.pdf", "vendor_comparison.xlsx"],
      status: "Pending",
      department: "Mess Operations"
    },
    {
      id: 6,
      from: "HR Manager",
      to: "principal@college.edu",
      subject: "Staff Performance Review & Recruitment Requirements",
      body: "Dear Principal,\n\nPlease find the quarterly staff performance review and urgent recruitment needs.\n\nSTAFF PERFORMANCE SUMMARY:\n\nEXCELLENT PERFORMERS (Rating 4.5+/5.0):\n- Dr. Suresh Sharma (Warden Block A): 4.8/5.0\n- Priya Mehta (Finance Officer): 4.7/5.0\n- Vikram Singh (Security Head): 4.6/5.0\n\nGOOD PERFORMERS (Rating 3.5-4.4/5.0):\n- 15 staff members in this category\n- Overall improvement from last quarter\n\nNEEDS IMPROVEMENT (Rating 3.0-3.4/5.0):\n- 8 staff members\n- Performance improvement plans initiated\n- Additional training recommended\n\nURGENT RECRUITMENT NEEDS:\n\n1. CRITICAL POSITIONS:\n   - Hostel Warden (Block E): Immediate\n   - Maintenance Engineer: Within 15 days\n   - Accountant (Hostel Finance): Within 30 days\n\n2. ADDITIONAL STAFF REQUIRED:\n   - Security Guards: 4 positions\n   - Housekeeping Staff: 6 positions\n   - Mess Workers: 3 positions\n\nRECRUITMENT BUDGET:\n- Management positions: ₹18,50,000/year\n- Support staff: ₹14,25,000/year\n- Total annual cost: ₹32,75,000\n\nTRAINING & DEVELOPMENT:\n- Leadership training for wardens: ₹2,50,000\n- Safety training for all staff: ₹1,75,000\n- Customer service training: ₹1,25,000\n\nEMPLOYEE WELFARE INITIATIVES:\n- Health insurance upgrade\n- Performance bonus structure\n- Career advancement opportunities\n\nApproval required for recruitment and training budgets.\n\nRegards,\nSneha Reddy\nHR Manager\nContact: +91-9876543213",
      timestamp: "2025-08-29T15:45:00",
      isRead: true,
      isStarred: false,
      isImportant: false,
      priority: "Medium",
      category: "Human Resources",
      hasAttachment: true,
      attachments: ["performance_review.pdf", "recruitment_plan.pdf"],
      status: "Under Review",
      department: "Human Resources"
    },
    {
      id: 7,
      from: "IT Administrator",
      to: "principal@college.edu",
      subject: "Digital Transformation Plan - Hostel Management System",
      body: "Dear Principal,\n\nProposing a comprehensive digital transformation plan for hostel management.\n\nCURRENT SYSTEM LIMITATIONS:\n- Manual room allocation process\n- Paper-based maintenance requests\n- Limited parent communication\n- Inefficient fee tracking\n- No real-time occupancy data\n\nPROPOSED DIGITAL SOLUTIONS:\n\n1. HOSTEL ERP SYSTEM:\n   - Student registration & room allocation\n   - Online fee payment gateway\n   - Maintenance request portal\n   - Real-time dashboards\n   - Mobile application\n\n2. SMART INFRASTRUCTURE:\n   - IoT sensors for utilities monitoring\n   - Automated attendance system\n   - Digital notice boards\n   - QR code-based services\n\n3. COMMUNICATION PLATFORM:\n   - Parent-student-admin connectivity\n   - SMS/Email automation\n   - Emergency alert system\n   - Feedback collection system\n\nIMPLEMENTATION PLAN:\n\nPhase 1 (3 months): Core ERP System\n- Cost: ₹12,50,000\n- Features: Basic management functions\n\nPhase 2 (6 months): Smart Infrastructure\n- Cost: ₹18,75,000\n- Features: IoT integration, automation\n\nPhase 3 (9 months): Advanced Analytics\n- Cost: ₹8,25,000\n- Features: AI-based insights, predictive analysis\n\nTOTAL PROJECT COST: ₹39,50,000\n\nEXPECTED BENEFITS:\n- 70% reduction in manual work\n- 40% improvement in efficiency\n- Enhanced parent satisfaction\n- Real-time decision making\n- Cost savings: ₹15,00,000/year\n\nROI: 18 months\n\nVendor proposals and technical specifications attached.\n\nYour approval is requested to proceed with Phase 1.\n\nBest regards,\nRahul Agarwal\nIT Administrator\nContact: +91-9876543214",
      timestamp: "2025-08-29T10:20:00",
      isRead: false,
      isStarred: true,
      isImportant: true,
      priority: "High",
      category: "Technology",
      hasAttachment: true,
      attachments: ["digital_transformation_plan.pdf", "vendor_proposals.pdf", "technical_specs.pdf"],
      status: "Pending",
      department: "IT Services"
    }
  ]);

  const handleSend = () => {
    if (!formData.to || !formData.subject || !formData.body) {
      alert("All fields are required!");
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      from: `${currentUser.name} (${currentUser.role})`,
      to: formData.to,
      subject: formData.subject,
      body: formData.body,
      timestamp: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      isImportant: false,
      priority: formData.priority,
      category: formData.category,
      status: "Under Review",
      department: "Administration"
    };

    setMessages(prev => [newMessage, ...prev]);
    setFormData({ 
      to: "", 
      subject: "", 
      body: "", 
      priority: "Medium",
      category: "Administrative"
    });
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

  const updateStatus = (id: number, status: "Pending" | "Approved" | "Rejected" | "Under Review") => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, status } : msg
    ));
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
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Infrastructure": "bg-red-100 text-red-800",
      "Financial": "bg-green-100 text-green-800",
      "Strategic": "bg-purple-100 text-purple-800",
      "Security": "bg-orange-100 text-orange-800",
      "Operations": "bg-blue-100 text-blue-800",
      "Human Resources": "bg-yellow-100 text-yellow-800",
      "Technology": "bg-indigo-100 text-indigo-800",
      "Administrative": "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "Low": "bg-blue-100 text-blue-800",
      "Medium": "bg-yellow-100 text-yellow-800",
      "High": "bg-orange-100 text-orange-800",
      "Urgent": "bg-red-100 text-red-800"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Pending": "bg-yellow-100 text-yellow-800",
      "Approved": "bg-green-100 text-green-800",
      "Rejected": "bg-red-100 text-red-800",
      "Under Review": "bg-blue-100 text-blue-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || msg.category === selectedCategory;
    const matchesPriority = selectedPriority === "All" || msg.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const categories = ["All", ...Array.from(new Set(messages.map(msg => msg.category)))];
  const priorities = ["All", "Urgent", "High", "Medium", "Low"];
  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const urgentCount = messages.filter(msg => msg.priority === "Urgent" && !msg.isRead).length;

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Sidebar */}
      <div className="w-96 border-r border-gray-200 bg-white/90 backdrop-blur-sm flex flex-col shadow-xl">
        {/* Enhanced Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600/10 to-indigo-600/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Hostel Inbox</h1>
                <p className="text-sm text-gray-600">{currentUser.role} - {currentUser.name}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                  <span>{unreadCount} unread</span>
                  {urgentCount > 0 && (
                    <span className="flex items-center text-red-600 font-medium">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {urgentCount} urgent
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsComposeOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Enhanced Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search messages, departments, issues..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex space-x-2 mb-3">
            {priorities.map(priority => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedPriority === priority
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {priority}
              </button>
            ))}
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

        {/* Enhanced Message List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => markAsRead(msg.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedMessage === msg.id ? "bg-blue-50 border-blue-200" : ""
              } ${!msg.isRead ? "bg-blue-25 border-l-4 border-l-blue-500" : ""}`}
            >
              {/* Message Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${!msg.isRead ? "bg-blue-500" : "bg-gray-300"}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-gray-900 truncate text-sm ${!msg.isRead ? "font-bold" : ""}`}>
                      {msg.from}
                    </p>
                    {msg.department && (
                      <p className="text-xs text-gray-500 truncate">{msg.department}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {msg.priority === "Urgent" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {msg.isImportant && <Bell className="w-4 h-4 text-orange-500" />}
                  </div>
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

              {/* Subject */}
              <h3 className={`text-sm mb-2 line-clamp-2 ${!msg.isRead ? "font-semibold text-gray-900" : "text-gray-800"}`}>
                {msg.subject}
              </h3>
              
              {/* Body Preview */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{msg.body}</p>
              
              {/* Tags and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(msg.category)}`}>
                    {msg.category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(msg.priority)}`}>
                    {msg.priority}
                  </span>
                  {msg.status && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(msg.status)}`}>
                      {msg.status}
                    </span>
                  )}
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

      {/* Enhanced Message View */}
      <div className="flex-1 flex flex-col">
        {selectedMessageData ? (
          <>
            {/* Enhanced Message Header */}
            <div className="p-6 border-b border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMessageData.subject}</h2>
                    {selectedMessageData.priority === "Urgent" && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        URGENT
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <div>
                        <span className="text-gray-500">From:</span>
                        <span className="ml-1 font-medium">{selectedMessageData.from}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4" />
                      <div>
                        <span className="text-gray-500">Department:</span>
                        <span className="ml-1 font-medium">{selectedMessageData.department}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <div>
                        <span className="text-gray-500">Received:</span>
                        <span className="ml-1 font-medium">{new Date(selectedMessageData.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedMessageData.category)}`}>
                      <Tag className="w-3 h-3 inline mr-1" />
                      {selectedMessageData.category}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(selectedMessageData.priority)}`}>
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      {selectedMessageData.priority} Priority
                    </span>
                    {selectedMessageData.status && (
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedMessageData.status)}`}>
                        <Eye className="w-3 h-3 inline mr-1" />
                        {selectedMessageData.status}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateStatus(selectedMessageData.id, "Approved")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedMessageData.id, "Under Review")}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    Review
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedMessageData.id, "Rejected")}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
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

            {/* Enhanced Message Body */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
              <div className="max-w-5xl">
                <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
                  <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans text-sm">
                    {selectedMessageData.body}
                  </pre>
                </div>
                
                {/* Enhanced Attachments */}
                {selectedMessageData.hasAttachment && selectedMessageData.attachments && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Attachments ({selectedMessageData.attachments.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedMessageData.attachments.map((attachment, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-500 rounded-lg">
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-blue-900">{attachment}</p>
                                <p className="text-xs text-blue-700">
                                  {attachment.includes('.pdf') ? 'PDF Document' :
                                   attachment.includes('.xlsx') ? 'Excel Spreadsheet' :
                                   attachment.includes('.zip') ? 'Compressed Archive' : 'Document'}
                                </p>
                              </div>
                            </div>
                            <button className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                              <Download className="w-3 h-3" />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Summary */}
                {selectedMessageData.category === "Financial" && (
                  <div className="mt-6 p-6 bg-green-50 rounded-2xl border border-green-200">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">Financial Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-lg font-bold text-green-600">₹45.95L</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Net Profit</p>
                        <p className="text-lg font-bold text-blue-600">₹8.60L</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Collection Rate</p>
                        <p className="text-lg font-bold text-purple-600">96.2%</p>
                      </div>
                      <div className="text-center">
                        <Building2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Occupancy</p>
                        <p className="text-lg font-bold text-orange-600">91.7%</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Decision Requirements */}
                {(selectedMessageData.category === "Infrastructure" || selectedMessageData.category === "Strategic") && (
                  <div className="mt-6 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Decision Required
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">Immediate Actions:</h5>
                        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                          <li>Budget approval required</li>
                          <li>Timeline confirmation needed</li>
                          <li>Resource allocation decision</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">Stakeholders to Consult:</h5>
                        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                          <li>Finance Committee</li>
                          <li>Board of Directors</li>
                          <li>Department Heads</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <Mail className="w-16 h-16 text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">Administrative Dashboard</h3>
              <p className="text-gray-500 mb-6">Select a message to view details and take administrative actions</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
                  <div className="text-sm text-gray-600">Unread Messages</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
                  <div className="text-sm text-gray-600">Urgent Items</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Compose Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Compose Administrative Message</h2>
                <p className="text-sm text-gray-600">Sending as: {currentUser.name} ({currentUser.role})</p>
              </div>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="recipient@college.edu"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as "Low" | "Medium" | "High" | "Urgent" })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="Administrative">Administrative</option>
                    <option value="Financial">Financial</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Strategic">Strategic Planning</option>
                    <option value="Security">Security</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Technology">Technology</option>
                  </select>
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={10}
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Type your administrative message here..."
                  required
                />
              </div>

              {/* Quick Templates */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Templates:</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFormData({
                      ...formData,
                      subject: "Budget Approval Request",
                      body: "Dear Colleague,\n\nI am requesting approval for the following budget allocation:\n\n[Details]\n\nPlease review and provide your approval.\n\nBest regards,\n" + currentUser.name
                    })}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  >
                    Budget Approval
                  </button>
                  <button
                    onClick={() => setFormData({
                      ...formData,
                      subject: "Policy Update Notification",
                      body: "Dear Team,\n\nPlease be informed of the following policy update:\n\n[Policy Details]\n\nEffective Date: [Date]\n\nBest regards,\n" + currentUser.name
                    })}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                  >
                    Policy Update
                  </button>
                  <button
                    onClick={() => setFormData({
                      ...formData,
                      subject: "Meeting Request",
                      body: "Dear Colleague,\n\nI would like to schedule a meeting to discuss:\n\n[Agenda]\n\nProposed Date & Time: [Date/Time]\nVenue: [Location]\n\nPlease confirm your availability.\n\nBest regards,\n" + currentUser.name
                    })}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors"
                  >
                    Meeting Request
                  </button>
                </div>
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

export default AdminHostelInbox;