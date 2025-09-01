 import React, { useState, useMemo, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Search, Filter, Download, Users, TrendingUp, AlertTriangle, Calendar, Clock, UserCheck, FileDown, Plus, Edit, Trash2, CheckCircle, XCircle, Eye, FileText, MessageSquare, Clock3, CalendarDays } from "lucide-react";

interface Student {
  regNo: string;
  name: string;
  program: string;
  department: string;
  semester: number;
  section: string;
  email: string;
}

interface LeaveRequest {
  id: string;
  regNo: string;
  studentName: string;
  department: string;
  section: string;
  leaveType: 'sick' | 'personal' | 'emergency' | 'family' | 'medical' | 'other';
  reason: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  attachments?: string[];
  contactNumber: string;
  parentContact?: string;
  emergencyContact?: string;
}

const StudentLeaveManagement: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];

  // Fixed student data
  const students: Student[] = [
    { regNo: "01027EE001", name: "Sandeep Kumar", program: "B.TECH CS", department: "CSE", semester: 5, section: "A", email: "sandeep@college.edu" },
    { regNo: "01027EE002", name: "Priya Sharma", program: "B.TECH CS", department: "CSE", semester: 5, section: "A", email: "priya@college.edu" },
    { regNo: "01027EE003", name: "Amit Patel", program: "B.TECH CS", department: "CSE", semester: 5, section: "B", email: "amit@college.edu" },
    { regNo: "01027EE004", name: "Rahul Singh", program: "B.TECH CS", department: "CSE", semester: 5, section: "A", email: "rahul@college.edu" },
    { regNo: "01027EE005", name: "Amit Gupta", program: "B.TECH CS", department: "CSE", semester: 5, section: "B", email: "amitg@college.edu" },
    { regNo: "01027EE006", name: "Neha Verma", program: "B.TECH CS", department: "CSE", semester: 5, section: "A", email: "neha@college.edu" },
    { regNo: "01027EE007", name: "Ravi Kumar", program: "B.TECH CS", department: "CSE", semester: 5, section: "C", email: "ravi@college.edu" },
    { regNo: "01027EE008", name: "Pooja Reddy", program: "B.TECH CS", department: "CSE", semester: 5, section: "B", email: "pooja@college.edu" },
    { regNo: "01027EE009", name: "Karan Joshi", program: "B.TECH CS", department: "CSE", semester: 5, section: "C", email: "karan@college.edu" },
    { regNo: "01027EE010", name: "Simran Kaur", program: "B.TECH CS", department: "CSE", semester: 5, section: "A", email: "simran@college.edu" },
    { regNo: "02027EE011", name: "Vikash Yadav", program: "B.TECH EE", department: "EEE", semester: 5, section: "A", email: "vikash@college.edu" },
    { regNo: "02027EE012", name: "Anita Roy", program: "B.TECH EE", department: "EEE", semester: 5, section: "B", email: "anita@college.edu" },
    { regNo: "02027EE013", name: "Deepak Mehta", program: "B.TECH EE", department: "EEE", semester: 5, section: "B", email: "deepak@college.edu" },
    { regNo: "02027EE014", name: "Sunita Jain", program: "B.TECH EE", department: "EEE", semester: 5, section: "A", email: "sunita@college.edu" },
    { regNo: "03027EE015", name: "Rohit Sharma", program: "B.TECH ME", department: "ME", semester: 5, section: "C", email: "rohit@college.edu" },
    { regNo: "03027EE016", name: "Neha Singh", program: "B.TECH ME", department: "ME", semester: 5, section: "B", email: "nehas@college.edu" },
    { regNo: "03027EE017", name: "Ajay Kumar", program: "B.TECH ME", department: "ME", semester: 5, section: "C", email: "ajay@college.edu" },
    { regNo: "03027EE018", name: "Alok Mishra", program: "B.TECH ME", department: "ME", semester: 5, section: "A", email: "alok@college.edu" },
    { regNo: "03027EE019", name: "Priya Verma", program: "B.TECH ME", department: "ME", semester: 5, section: "B", email: "priyav@college.edu" },
    { regNo: "03027EE020", name: "Sanjay Reddy", program: "B.TECH ME", department: "ME", semester: 5, section: "C", email: "sanjay@college.edu" }
  ];

  // Sample leave requests data
  const initialLeaveRequests: LeaveRequest[] = [
    {
      id: "LR001",
      regNo: "01027EE001",
      studentName: "Sandeep Kumar",
      department: "CSE",
      section: "A",
      leaveType: "sick",
      reason: "Fever and cold symptoms, doctor advised rest for complete recovery",
      fromDate: "2025-09-03",
      toDate: "2025-09-05",
      totalDays: 3,
      appliedDate: "2025-09-01",
      status: "pending",
      contactNumber: "+91-9876543210",
      parentContact: "+91-9876543211"
    },
    {
      id: "LR002",
      regNo: "01027EE002",
      studentName: "Priya Sharma",
      department: "CSE",
      section: "A",
      leaveType: "family",
      reason: "Sister's wedding ceremony - important family function",
      fromDate: "2025-09-10",
      toDate: "2025-09-12",
      totalDays: 3,
      appliedDate: "2025-08-28",
      status: "approved",
      approvedBy: "Dr. Rajesh Kumar",
      approvedDate: "2025-08-30",
      contactNumber: "+91-9876543212",
      parentContact: "+91-9876543213"
    },
    {
      id: "LR003",
      regNo: "01027EE004",
      studentName: "Rahul Singh",
      department: "CSE",
      section: "A",
      leaveType: "medical",
      reason: "Dental surgery appointment at Apollo Hospital",
      fromDate: "2025-09-02",
      toDate: "2025-09-02",
      totalDays: 1,
      appliedDate: "2025-08-30",
      status: "rejected",
      rejectionReason: "Insufficient notice period - minimum 3 days required",
      contactNumber: "+91-9876543214"
    },
    {
      id: "LR004",
      regNo: "02027EE011",
      studentName: "Vikash Yadav",
      department: "EEE",
      section: "A",
      leaveType: "emergency",
      reason: "Grandfather's sudden illness, need to travel home urgently for family support",
      fromDate: "2025-09-01",
      toDate: "2025-09-04",
      totalDays: 4,
      appliedDate: "2025-08-31",
      status: "approved",
      approvedBy: "Prof. Sunita Mehta",
      approvedDate: "2025-09-01",
      contactNumber: "+91-9876543215",
      emergencyContact: "+91-9876543216"
    },
    {
      id: "LR005",
      regNo: "03027EE015",
      studentName: "Rohit Sharma",
      department: "ME",
      section: "C",
      leaveType: "personal",
      reason: "Attending cousin's graduation ceremony and celebration",
      fromDate: "2025-09-06",
      toDate: "2025-09-07",
      totalDays: 2,
      appliedDate: "2025-08-29",
      status: "pending",
      contactNumber: "+91-9876543217",
      parentContact: "+91-9876543218"
    },
    {
      id: "LR006",
      regNo: "01027EE006",
      studentName: "Neha Verma",
      department: "CSE",
      section: "A",
      leaveType: "medical",
      reason: "Eye surgery follow-up appointment with specialist",
      fromDate: "2025-09-08",
      toDate: "2025-09-09",
      totalDays: 2,
      appliedDate: "2025-09-01",
      status: "approved",
      approvedBy: "Dr. Rajesh Kumar",
      approvedDate: "2025-09-01",
      contactNumber: "+91-9876543220"
    },
    {
      id: "LR007",
      regNo: "03027EE017",
      studentName: "Ajay Kumar",
      department: "ME",
      section: "C",
      leaveType: "emergency",
      reason: "Mother hospitalized - need to be with family during critical time",
      fromDate: "2025-09-05",
      toDate: "2025-09-08",
      totalDays: 4,
      appliedDate: "2025-09-01",
      status: "pending",
      contactNumber: "+91-9876543221",
      emergencyContact: "+91-9876543222"
    }
  ];

  // State management
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"all" | "pending" | "approved" | "rejected" | "analytics">("all");
  const [showAddLeave, setShowAddLeave] = useState(false);
  const [showLeaveDetails, setShowLeaveDetails] = useState<string | null>(null);
  const [editingLeave, setEditingLeave] = useState<string | null>(null);

  const recordsPerPage = 8;

  // New leave request form state
  const [newLeave, setNewLeave] = useState({
    regNo: "",
    leaveType: "sick" as LeaveRequest['leaveType'],
    reason: "",
    fromDate: "",
    toDate: "",
    contactNumber: "",
    parentContact: "",
    emergencyContact: ""
  });

  // Edit leave state
  const [editLeave, setEditLeave] = useState<Partial<LeaveRequest>>({});

  // Get unique values for filters
  const sections = ["All", ...new Set(students.map(s => s.section))];
  const departments = ["All", ...new Set(students.map(s => s.department))];
  const leaveTypes = ["All", "sick", "personal", "emergency", "family", "medical", "other"];

  // Calculate total days between two dates
  const calculateDays = useCallback((fromDate: string, toDate: string): number => {
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, []);

  // Filter leave requests
  const filteredLeaveRequests = useMemo(() => {
    let filtered = leaveRequests;

    // Filter by view mode
    if (viewMode === "pending") {
      filtered = filtered.filter(req => req.status === "pending");
    } else if (viewMode === "approved") {
      filtered = filtered.filter(req => req.status === "approved");
    } else if (viewMode === "rejected") {
      filtered = filtered.filter(req => req.status === "rejected");
    }

    // Apply other filters
    return filtered.filter((request) => {
      const matchesSearch = 
        request.regNo.toLowerCase().includes(search.toLowerCase()) ||
        request.studentName.toLowerCase().includes(search.toLowerCase()) ||
        request.reason.toLowerCase().includes(search.toLowerCase());
      
      const matchesSection = selectedSection === "All" || request.section === selectedSection;
      const matchesDepartment = selectedDepartment === "All" || request.department === selectedDepartment;
      const matchesStatus = statusFilter === "All" || request.status === statusFilter;
      const matchesLeaveType = leaveTypeFilter === "All" || request.leaveType === leaveTypeFilter;

      return matchesSearch && matchesSection && matchesDepartment && matchesStatus && matchesLeaveType;
    });
  }, [leaveRequests, search, selectedSection, selectedDepartment, statusFilter, leaveTypeFilter, viewMode]);

  // Pagination
  const totalPages = Math.ceil(filteredLeaveRequests.length / recordsPerPage);
  const indexOfFirstRecord = (currentPage - 1) * recordsPerPage;
  const indexOfLastRecord = Math.min(indexOfFirstRecord + recordsPerPage, filteredLeaveRequests.length);
  const currentRecords = filteredLeaveRequests.slice(indexOfFirstRecord, indexOfLastRecord);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedSection, selectedDepartment, statusFilter, leaveTypeFilter, viewMode]);

  // Add new leave request
  const addLeaveRequest = useCallback(() => {
    if (!newLeave.regNo || !newLeave.reason || !newLeave.fromDate || !newLeave.toDate || !newLeave.contactNumber) {
      alert("Please fill all required fields!");
      return;
    }

    const student = students.find(s => s.regNo === newLeave.regNo);
    if (!student) {
      alert("Student not found!");
      return;
    }

    if (new Date(newLeave.fromDate) > new Date(newLeave.toDate)) {
      alert("From date cannot be after to date!");
      return;
    }

    const totalDays = calculateDays(newLeave.fromDate, newLeave.toDate);

    const newRequest: LeaveRequest = {
      id: "LR" + Date.now().toString(),
      regNo: newLeave.regNo,
      studentName: student.name,
      department: student.department,
      section: student.section,
      leaveType: newLeave.leaveType,
      reason: newLeave.reason,
      fromDate: newLeave.fromDate,
      toDate: newLeave.toDate,
      totalDays,
      appliedDate: today,
      status: "pending",
      contactNumber: newLeave.contactNumber,
      parentContact: newLeave.parentContact,
      emergencyContact: newLeave.emergencyContact
    };

    setLeaveRequests(prev => [newRequest, ...prev]);
    setNewLeave({
      regNo: "",
      leaveType: "sick",
      reason: "",
      fromDate: "",
      toDate: "",
      contactNumber: "",
      parentContact: "",
      emergencyContact: ""
    });
    setShowAddLeave(false);
    alert("Leave request submitted successfully!");
  }, [newLeave, students, today, calculateDays]);

  // Update leave status
  const updateLeaveStatus = useCallback((id: string, status: 'approved' | 'rejected', rejectionReason?: string) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === id 
        ? {
            ...request,
            status,
            approvedBy: status === "approved" ? "Admin User" : undefined,
            approvedDate: status === "approved" ? today : undefined,
            rejectionReason: status === "rejected" ? rejectionReason : undefined
          }
        : request
    ));
  }, [today]);

  // Edit leave request
  const saveEditLeave = useCallback(() => {
    if (!editLeave.id) return;

    setLeaveRequests(prev => prev.map(request => 
      request.id === editLeave.id 
        ? {
            ...request,
            ...editLeave,
            totalDays: editLeave.fromDate && editLeave.toDate 
              ? calculateDays(editLeave.fromDate, editLeave.toDate)
              : request.totalDays
          }
        : request
    ));
    setEditingLeave(null);
    setEditLeave({});
    alert("Leave request updated successfully!");
  }, [editLeave, calculateDays]);

  // Delete leave request
  const deleteLeaveRequest = useCallback((id: string) => {
    if (confirm("Are you sure you want to delete this leave request?")) {
      setLeaveRequests(prev => prev.filter(request => request.id !== id));
      alert("Leave request deleted successfully!");
    }
  }, []);

  // Export function
  const exportToCSV = useCallback(() => {
    try {
      let csvContent = "Leave ID,Reg No,Student Name,Department,Section,Leave Type,Reason,From Date,To Date,Total Days,Applied Date,Status,Approved By,Contact Number\n";
      
      filteredLeaveRequests.forEach((request) => {
        csvContent += `"${request.id}","${request.regNo}","${request.studentName}","${request.department}","${request.section}","${request.leaveType}","${request.reason}","${request.fromDate}","${request.toDate}",${request.totalDays},"${request.appliedDate}","${request.status}","${request.approvedBy || 'N/A'}","${request.contactNumber}"\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `leave_requests_${today}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  }, [filteredLeaveRequests, today]);

  const resetFilters = () => {
    setSearch("");
    setSelectedSection("All");
    setSelectedDepartment("All");
    setStatusFilter("All");
    setLeaveTypeFilter("All");
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-50 border-green-200";
      case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "rejected": return "text-red-600 bg-red-50 border-red-200";
      case "cancelled": return "text-gray-600 bg-gray-50 border-gray-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "sick": return "text-red-600 bg-red-50";
      case "emergency": return "text-orange-600 bg-orange-50";
      case "medical": return "text-pink-600 bg-pink-50";
      case "family": return "text-blue-600 bg-blue-50";
      case "personal": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  // Analytics calculations
  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(r => r.status === "pending").length;
  const approvedRequests = leaveRequests.filter(r => r.status === "approved").length;
  const rejectedRequests = leaveRequests.filter(r => r.status === "rejected").length;

  const leaveTypeDistribution = leaveTypes.slice(1).map(type => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count: leaveRequests.filter(r => r.leaveType === type).length,
    color: type === "sick" ? "#EF4444" : type === "emergency" ? "#F97316" : type === "medical" ? "#EC4899" : type === "family" ? "#3B82F6" : type === "personal" ? "#8B5CF6" : "#6B7280"
  }));

  const monthlyTrends = [
    { month: "Jan", requests: 12, approved: 10, rejected: 2 },
    { month: "Feb", requests: 15, approved: 13, rejected: 2 },
    { month: "Mar", requests: 18, approved: 14, rejected: 4 },
    { month: "Apr", requests: 22, approved: 18, rejected: 4 },
    { month: "May", requests: 8, approved: 7, rejected: 1 },
    { month: "Jun", requests: 5, approved: 4, rejected: 1 },
    { month: "Jul", requests: 14, approved: 12, rejected: 2 },
    { month: "Aug", requests: 16, approved: 13, rejected: 3 },
    { month: "Sep", requests: totalRequests, approved: approvedRequests, rejected: rejectedRequests }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Student Leave Management System</h2>
          <p className="text-gray-600">Comprehensive leave request tracking and approval workflow</p>
        </div> */}

        {/* View Mode Toggle */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <FileText size={16} />
            All Requests
          </button>
          <button
            onClick={() => setViewMode("pending")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "pending" ? "bg-yellow-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <Clock3 size={16} />
            Pending ({pendingRequests})
          </button>
          <button
            onClick={() => setViewMode("approved")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "approved" ? "bg-green-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <CheckCircle size={16} />
            Approved ({approvedRequests})
          </button>
          <button
            onClick={() => setViewMode("rejected")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "rejected" ? "bg-red-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <XCircle size={16} />
            Rejected ({rejectedRequests})
          </button>
          <button
            onClick={() => setViewMode("analytics")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "analytics" ? "bg-purple-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <TrendingUp size={16} />
            Analytics
          </button>
        </div>

        {/* Add Leave Request Button */}
        {viewMode !== "analytics" && (
          <div className="mb-6">
            <button
              onClick={() => setShowAddLeave(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              Add New Leave Request
            </button>
          </div>
        )}

        {/* Statistics Cards */}
        {viewMode !== "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
              <p className="text-2xl font-bold text-blue-600">{totalRequests}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-sm font-medium text-gray-500">Approved</h3>
              <p className="text-2xl font-bold text-green-600">{approvedRequests}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
              <p className="text-2xl font-bold text-red-600">{rejectedRequests}</p>
            </div>
          </div>
        )}

        {viewMode !== "analytics" && (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 p-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sections.map(section => (
                    <option key={section} value={section}>Section: {section}</option>
                  ))}
                </select>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>Dept: {dept}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={leaveTypeFilter}
                  onChange={(e) => setLeaveTypeFilter(e.target.value)}
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {leaveTypes.map(type => (
                    <option key={type} value={type}>
                      Type: {type === "All" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>

                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 transition-colors"
                >
                  <Filter size={16} />
                  Reset
                </button>

                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                  <FileDown size={16} />
                  Export
                </button>
              </div>
            </div>

            {/* Leave Requests Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Leave Requests</h3>
                <span className="text-sm text-gray-500">
                  {filteredLeaveRequests.length} requests found
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-100 text-left">
                      <th className="p-3 border font-semibold">Leave ID</th>
                      <th className="p-3 border font-semibold">Student</th>
                      <th className="p-3 border font-semibold">Type</th>
                      <th className="p-3 border font-semibold">Duration</th>
                      <th className="p-3 border font-semibold">Applied</th>
                      <th className="p-3 border font-semibold">Status</th>
                      <th className="p-3 border font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length > 0 ? (
                      currentRecords.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 border font-mono text-sm">{request.id}</td>
                          <td className="p-3 border">
                            <div>
                              <div className="font-medium">{request.studentName}</div>
                              <div className="text-sm text-gray-500">{request.regNo} • {request.department}-{request.section}</div>
                            </div>
                          </td>
                          <td className="p-3 border">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getLeaveTypeColor(request.leaveType)}`}>
                              {request.leaveType}
                            </span>
                          </td>
                          <td className="p-3 border">
                            <div className="text-sm">
                              <div className="font-medium">
                                {new Date(request.fromDate).toLocaleDateString('en-IN')} to {new Date(request.toDate).toLocaleDateString('en-IN')}
                              </div>
                              <div className="text-gray-500">{request.totalDays} day{request.totalDays > 1 ? 's' : ''}</div>
                            </div>
                          </td>
                          <td className="p-3 border text-sm">
                            {new Date(request.appliedDate).toLocaleDateString('en-IN')}
                          </td>
                          <td className="p-3 border">
                            <span className={`px-2 py-1 rounded-lg text-sm font-medium capitalize border ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="p-3 border">
                            <div className="flex gap-1">
                              <button
                                onClick={() => setShowLeaveDetails(request.id)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              {request.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => updateLeaveStatus(request.id, "approved")}
                                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                    title="Approve"
                                  >
                                    <CheckCircle size={16} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      const reason = prompt("Reason for rejection:");
                                      if (reason) updateLeaveStatus(request.id, "rejected", reason);
                                    }}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Reject"
                                  >
                                    <XCircle size={16} />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => {
                                  setEditingLeave(request.id);
                                  setEditLeave(request);
                                }}
                                className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => deleteLeaveRequest(request.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center p-8 text-gray-500">
                          No leave requests found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRecord + 1} to {indexOfLastRecord} of {filteredLeaveRequests.length} records
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                      First
                    </button>
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                      ◀ Previous
                    </button>

                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 border rounded-lg transition-colors ${
                            currentPage === pageNum ? "bg-purple-500 text-white" : "bg-white hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                      Next ▶
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                      Last
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Analytics View */}
        {viewMode === "analytics" && (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500">Total Leave Requests</h3>
                <p className="text-3xl font-bold text-blue-600">{totalRequests}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-gray-500">Approval Rate</h3>
                <p className="text-3xl font-bold text-green-600">
                  {totalRequests > 0 ? Math.round((approvedRequests / totalRequests) * 100) : 0}%
                </p>
                <p className="text-sm text-gray-500 mt-1">{approvedRequests} approved</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-sm font-medium text-gray-500">Avg Processing Time</h3>
                <p className="text-3xl font-bold text-yellow-600">2.3</p>
                <p className="text-sm text-gray-500 mt-1">days</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-sm font-medium text-gray-500">Most Common</h3>
                <p className="text-3xl font-bold text-purple-600">Sick</p>
                <p className="text-sm text-gray-500 mt-1">leave type</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Leave Type Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leaveTypeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={({ type, count, percent }) => `${type}: ${count} (${(percent * 100).toFixed(1)}%)`}
                    >
                      {leaveTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Leave Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={3} name="Total Requests" />
                    <Line type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={2} name="Approved" />
                    <Line type="monotone" dataKey="rejected" stroke="#EF4444" strokeWidth={2} name="Rejected" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department-wise Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Department-wise Leave Requests</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={departments.slice(1).map(dept => {
                    const deptRequests = leaveRequests.filter(r => r.department === dept);
                    return {
                      department: dept,
                      total: deptRequests.length,
                      approved: deptRequests.filter(r => r.status === "approved").length,
                      pending: deptRequests.filter(r => r.status === "pending").length,
                      rejected: deptRequests.filter(r => r.status === "rejected").length
                    };
                  })}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="approved" fill="#10B981" name="Approved" />
                    <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                    <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Leave Duration Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Single Day Leaves</span>
                    <span className="font-semibold text-blue-600">
                      {leaveRequests.filter(r => r.totalDays === 1).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">2-3 Days</span>
                    <span className="font-semibold text-green-600">
                      {leaveRequests.filter(r => r.totalDays >= 2 && r.totalDays <= 3).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700">4-7 Days</span>
                    <span className="font-semibold text-yellow-600">
                      {leaveRequests.filter(r => r.totalDays >= 4 && r.totalDays <= 7).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-700">More than 7 Days</span>
                    <span className="font-semibold text-red-600">
                      {leaveRequests.filter(r => r.totalDays > 7).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Leave Activity</h3>
              <div className="space-y-3">
                {leaveRequests.slice(0, 5).map(request => (
                  <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        request.status === "approved" ? "bg-green-500" :
                        request.status === "pending" ? "bg-yellow-500" :
                        request.status === "rejected" ? "bg-red-500" : "bg-gray-500"
                      }`}></div>
                      <div>
                        <span className="font-medium">{request.studentName}</span>
                        <span className="text-gray-500 ml-2">requested {request.leaveType} leave</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(request.appliedDate).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Leave Request Modal */}
        {showAddLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-800">Add New Leave Request</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newLeave.regNo}
                      onChange={(e) => setNewLeave({...newLeave, regNo: e.target.value})}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Student</option>
                      {students.map(student => (
                        <option key={student.regNo} value={student.regNo}>
                          {student.regNo} - {student.name} ({student.department}-{student.section})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Leave Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newLeave.leaveType}
                      onChange={(e) => setNewLeave({...newLeave, leaveType: e.target.value as any})}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="sick">Sick Leave</option>
                      <option value="personal">Personal</option>
                      <option value="emergency">Emergency</option>
                      <option value="family">Family Event</option>
                      <option value="medical">Medical Appointment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={newLeave.contactNumber}
                      onChange={(e) => setNewLeave({...newLeave, contactNumber: e.target.value})}
                      placeholder="+91-XXXXXXXXXX"
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={newLeave.fromDate}
                      onChange={(e) => setNewLeave({...newLeave, fromDate: e.target.value})}
                      min={today}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={newLeave.toDate}
                      onChange={(e) => setNewLeave({...newLeave, toDate: e.target.value})}
                      min={newLeave.fromDate || today}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent/Guardian Contact
                    </label>
                    <input
                      type="tel"
                      value={newLeave.parentContact}
                      onChange={(e) => setNewLeave({...newLeave, parentContact: e.target.value})}
                      placeholder="+91-XXXXXXXXXX"
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={newLeave.emergencyContact}
                      onChange={(e) => setNewLeave({...newLeave, emergencyContact: e.target.value})}
                      placeholder="+91-XXXXXXXXXX"
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Leave <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newLeave.reason}
                      onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                      placeholder="Please provide detailed reason for leave..."
                      rows={4}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  {newLeave.fromDate && newLeave.toDate && (
                    <div className="md:col-span-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Total Leave Days:</strong> {calculateDays(newLeave.fromDate, newLeave.toDate)} day(s)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50 flex gap-3">
                <button
                  onClick={addLeaveRequest}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Submit Leave Request
                </button>
                <button
                  onClick={() => setShowAddLeave(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Leave Request Modal */}
        {editingLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-800">Edit Leave Request</h3>
                <p className="text-gray-600 mt-1">ID: {editLeave.id}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Leave Type
                    </label>
                    <select
                      value={editLeave.leaveType || ""}
                      onChange={(e) => setEditLeave({...editLeave, leaveType: e.target.value as any})}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="sick">Sick Leave</option>
                      <option value="personal">Personal</option>
                      <option value="emergency">Emergency</option>
                      <option value="family">Family Event</option>
                      <option value="medical">Medical Appointment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={editLeave.contactNumber || ""}
                      onChange={(e) => setEditLeave({...editLeave, contactNumber: e.target.value})}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={editLeave.fromDate || ""}
                      onChange={(e) => setEditLeave({...editLeave, fromDate: e.target.value})}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={editLeave.toDate || ""}
                      onChange={(e) => setEditLeave({...editLeave, toDate: e.target.value})}
                      min={editLeave.fromDate}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent/Guardian Contact
                    </label>
                    <input
                      type="tel"
                      value={editLeave.parentContact || ""}
                      onChange={(e) => setEditLeave({...editLeave, parentContact: e.target.value})}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={editLeave.emergencyContact || ""}
                      onChange={(e) => setEditLeave({...editLeave, emergencyContact: e.target.value})}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Leave
                    </label>
                    <textarea
                      value={editLeave.reason || ""}
                      onChange={(e) => setEditLeave({...editLeave, reason: e.target.value})}
                      rows={4}
                      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  {editLeave.fromDate && editLeave.toDate && (
                    <div className="md:col-span-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Total Leave Days:</strong> {calculateDays(editLeave.fromDate, editLeave.toDate)} day(s)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50 flex gap-3">
                <button
                  onClick={saveEditLeave}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingLeave(null);
                    setEditLeave({});
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leave Details Modal */}
        {showLeaveDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              {(() => {
                const request = leaveRequests.find(r => r.id === showLeaveDetails);
                if (!request) return null;

                return (
                  <>
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">Leave Request Details</h3>
                          <p className="text-gray-600 mt-1">ID: {request.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(request.status)}`}>
                          {request.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Student Information</h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>Name:</strong> {request.studentName}</div>
                              <div><strong>Reg No:</strong> {request.regNo}</div>
                              <div><strong>Department:</strong> {request.department}</div>
                              <div><strong>Section:</strong> {request.section}</div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>Student Contact:</strong> {request.contactNumber}</div>
                              {request.parentContact && <div><strong>Parent Contact:</strong> {request.parentContact}</div>}
                              {request.emergencyContact && <div><strong>Emergency Contact:</strong> {request.emergencyContact}</div>}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Leave Details</h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>Type:</strong> 
                                <span className={`ml-2 px-2 py-1 rounded text-xs ${getLeaveTypeColor(request.leaveType)}`}>
                                  {request.leaveType.toUpperCase()}
                                </span>
                              </div>
                              <div><strong>Duration:</strong> {new Date(request.fromDate).toLocaleDateString('en-IN')} to {new Date(request.toDate).toLocaleDateString('en-IN')}</div>
                              <div><strong>Total Days:</strong> {request.totalDays}</div>
                              <div><strong>Applied Date:</strong> {new Date(request.appliedDate).toLocaleDateString('en-IN')}</div>
                            </div>
                          </div>

                          {(request.status === "approved" || request.status === "rejected") && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Status Information</h4>
                              <div className="space-y-2 text-sm">
                                {request.approvedBy && <div><strong>Approved By:</strong> {request.approvedBy}</div>}
                                {request.approvedDate && <div><strong>Approved Date:</strong> {new Date(request.approvedDate).toLocaleDateString('en-IN')}</div>}
                                {request.rejectionReason && <div><strong>Rejection Reason:</strong> {request.rejectionReason}</div>}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-gray-800 mb-2">Reason for Leave</h4>
                          <div className="p-3 bg-gray-50 rounded-lg text-sm">
                            {request.reason}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 border-t bg-gray-50 flex gap-3">
                      {request.status === "pending" && (
                        <>
                          <button
                            onClick={() => {
                              updateLeaveStatus(request.id, "approved");
                              setShowLeaveDetails(null);
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt("Reason for rejection:");
                              if (reason) {
                                updateLeaveStatus(request.id, "rejected", reason);
                                setShowLeaveDetails(null);
                              }
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setShowLeaveDetails(null)}
                        className="ml-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {viewMode !== "analytics" && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const pendingLeaves = leaveRequests.filter(r => r.status === "pending");
                  if (pendingLeaves.length === 0) {
                    alert("No pending requests to approve!");
                    return;
                  }
                  if (confirm(`Approve all ${pendingLeaves.length} pending requests?`)) {
                    pendingLeaves.forEach(request => updateLeaveStatus(request.id, "approved"));
                  }
                }}
                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                Approve All Pending
              </button>
              <button
                onClick={() => exportToCSV()}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Export Current View
              </button>
              <button
                onClick={() => {
                  const urgentLeaves = leaveRequests.filter(r => 
                    r.status === "pending" && 
                    (r.leaveType === "emergency" || r.leaveType === "medical")
                  );
                  if (urgentLeaves.length > 0) {
                    alert(`${urgentLeaves.length} urgent leave request(s) need immediate attention!`);
                  } else {
                    alert("No urgent requests pending.");
                  }
                }}
                className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Check Urgent Requests
              </button>
              <button
                onClick={() => {
                  const overdueApprovals = leaveRequests.filter(r => {
                    const daysSinceApplied = (new Date().getTime() - new Date(r.appliedDate).getTime()) / (1000 * 60 * 60 * 24);
                    return r.status === "pending" && daysSinceApplied > 3;
                  });
                  alert(`${overdueApprovals.length} requests pending for more than 3 days.`);
                }}
                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Check Overdue Approvals
              </button>
            </div>
          </div>
        )}

        {/* System Information */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>Today: {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} />
                <span>Last Updated: {new Date().toLocaleTimeString('en-IN')}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              ERP System - Leave Management Module
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLeaveManagement;