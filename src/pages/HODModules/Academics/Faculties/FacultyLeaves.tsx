import React, { useMemo, useState, useCallback } from "react";
import {
  Calendar,
  Clock,
  Users,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  Eye,
  MessageSquare,
  User,
  Building,
  CalendarDays,
  Timer,
  Plus,
  Edit3,
  Save,
  X,
  Check,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  BookOpen,
  Activity,
  TrendingUp,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Bell,
  Settings,
  RefreshCw,
  Briefcase,
  Globe,
  Star,
  Zap,
  Target,
  Info
} from "lucide-react";

type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Cancelled" | "Under Review";
type LeaveType = "Casual" | "Medical" | "Emergency" | "Conference" | "Personal" | "Maternity" | "Sabbatical" | "Compensatory";
type Priority = "Low" | "Medium" | "High" | "Urgent" | "Critical";

type Leave = {
  id: string;
  facultyId: string;
  facultyName: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  employeeId: string;
  from: string;
  to: string;
  days: number;
  workingDays: number;
  reason: string;
  leaveType: LeaveType;
  priority: Priority;
  status: LeaveStatus;
  appliedDate: string;
  processedDate?: string;
  processedBy?: string;
  note?: string;
  attachments?: string[];
  emergencyContact?: string;
  substituteArranged: boolean;
  substituteFaculty?: string;
  medicalCertificate?: boolean;
  leaveBalance: number;
  previousLeaves: number;
  joinDate: string;
  subjectsCovered: string[];
  classesAffected: string[];
  approvalLevel: "HOD" | "Principal" | "Management";
  academicYear: string;
  semester: string;
};

const HOD_DEPARTMENT = "Computer Science";

const FACULTY_LEAVES: Leave[] = [
  {
    id: "L001",
    facultyId: "FAC001",
    facultyName: "Dr. Ananya Sharma",
    department: "Computer Science",
    designation: "Professor",
    email: "ananya.sharma@bestcollege.edu",
    phone: "+91-98765-43210",
    employeeId: "EMP001",
    from: "2025-09-25",
    to: "2025-09-27",
    days: 3,
    workingDays: 3,
    reason: "Attending International AI Conference in Singapore - presenting research paper on 'Contextual Embeddings in Indic Languages'. This is a significant opportunity to represent the institution and share our research findings with the global academic community.",
    leaveType: "Conference",
    priority: "High",
    status: "Pending",
    appliedDate: "2025-09-18",
    attachments: ["conference_invitation.pdf", "paper_acceptance.pdf", "travel_itinerary.pdf"],
    emergencyContact: "+91-98765-43211",
    substituteArranged: true,
    substituteFaculty: "Dr. Karthik Rao",
    medicalCertificate: false,
    leaveBalance: 18,
    previousLeaves: 7,
    joinDate: "2015-07-15",
    subjectsCovered: ["Machine Learning", "AI Lab"],
    classesAffected: ["CS-3A (ML)", "CS-3B (AI Lab)", "CS-4A (Advanced AI)"],
    approvalLevel: "HOD",
    academicYear: "2024-25",
    semester: "Semester 5",
  },
  {
    id: "L002",
    facultyId: "FAC002",
    facultyName: "Prof. Rahul Verma",
    department: "Computer Science",
    designation: "Associate Professor",
    email: "rahul.verma@bestcollege.edu",
    phone: "+91-98765-40010",
    employeeId: "EMP002",
    from: "2025-09-22",
    to: "2025-09-22",
    days: 1,
    workingDays: 1,
    reason: "Medical consultation for routine health checkup and diagnostic tests as recommended by family physician.",
    leaveType: "Medical",
    priority: "Medium",
    status: "Approved",
    appliedDate: "2025-09-20",
    processedDate: "2025-09-21",
    processedBy: "HOD - Computer Science",
    note: "Approved. Please submit medical certificate upon return and ensure all classes are covered.",
    emergencyContact: "+91-98765-40011",
    substituteArranged: true,
    substituteFaculty: "Dr. Ananya Sharma",
    medicalCertificate: true,
    leaveBalance: 22,
    previousLeaves: 3,
    joinDate: "2018-08-20",
    subjectsCovered: ["Operating Systems"],
    classesAffected: ["CS-2A (OS Lab)"],
    approvalLevel: "HOD",
    academicYear: "2024-25",
    semester: "Semester 3",
  },
  {
    id: "L003",
    facultyId: "FAC004",
    facultyName: "Dr. Karthik Rao",
    department: "Computer Science",
    designation: "Assistant Professor",
    email: "karthik.rao@bestcollege.edu",
    phone: "+91-98111-22233",
    employeeId: "EMP004",
    from: "2025-09-30",
    to: "2025-10-04",
    days: 5,
    workingDays: 5,
    reason: "Sister's wedding ceremony - important family function requiring travel to hometown. This is a significant family event that requires my presence for traditional ceremonies and arrangements.",
    leaveType: "Personal",
    priority: "Medium",
    status: "Pending",
    appliedDate: "2025-09-17",
    emergencyContact: "+91-98111-22234",
    substituteArranged: false,
    medicalCertificate: false,
    leaveBalance: 15,
    previousLeaves: 10,
    joinDate: "2020-01-10",
    subjectsCovered: ["Database Systems", "Data Mining"],
    classesAffected: ["CS-3A (DBMS)", "CS-4B (Data Mining)", "CS-3B (DB Lab)"],
    approvalLevel: "HOD",
    academicYear: "2024-25",
    semester: "Semester 5",
  },
  {
    id: "L004",
    facultyId: "FAC005",
    facultyName: "Dr. Priya Menon",
    department: "Computer Science",
    designation: "Associate Professor",
    email: "priya.menon@bestcollege.edu",
    phone: "+91-97654-32109",
    employeeId: "EMP005",
    from: "2025-09-19",
    to: "2025-09-20",
    days: 2,
    workingDays: 2,
    reason: "Sudden onset of fever and flu symptoms. Unable to conduct classes due to health concerns and to prevent spread of illness to students and colleagues.",
    leaveType: "Medical",
    priority: "Urgent",
    status: "Rejected",
    appliedDate: "2025-09-19",
    processedDate: "2025-09-19",
    processedBy: "HOD - Computer Science",
    note: "Medical certificate required for approval. Please consult a registered medical practitioner and reapply with proper medical documentation. Immediate medical attention recommended.",
    emergencyContact: "+91-97654-32110",
    substituteArranged: false,
    medicalCertificate: false,
    leaveBalance: 20,
    previousLeaves: 5,
    joinDate: "2017-03-12",
    subjectsCovered: ["Network Security", "Cryptography"],
    classesAffected: ["CS-4A (Network Security)", "CS-4B (Cryptography Lab)"],
    approvalLevel: "HOD",
    academicYear: "2024-25",
    semester: "Semester 7",
  },
  {
    id: "L005",
    facultyId: "FAC006",
    facultyName: "Prof. Arjun Singh",
    department: "Computer Science",
    designation: "Professor",
    email: "arjun.singh@bestcollege.edu",
    phone: "+91-98765-54321",
    employeeId: "EMP006",
    from: "2025-10-01",
    to: "2025-12-31",
    days: 92,
    workingDays: 65,
    reason: "Research sabbatical at MIT - Collaborative research project on 'Accessible Computing Technologies for Differently-abled Users'. This is a prestigious opportunity funded by NSF grant to advance accessibility research.",
    leaveType: "Sabbatical",
    priority: "High",
    status: "Under Review",
    appliedDate: "2025-08-15",
    processedDate: "2025-08-20",
    processedBy: "Principal",
    note: "Forwarded to Academic Council for review. Requires Management approval due to duration. Excellent research opportunity with potential for international collaboration.",
    attachments: ["mit_invitation.pdf", "research_proposal.pdf", "nsf_grant_approval.pdf", "sabbatical_application.pdf"],
    emergencyContact: "+91-98765-54322",
    substituteArranged: true,
    substituteFaculty: "Dr. Ananya Sharma & Prof. Rahul Verma",
    medicalCertificate: false,
    leaveBalance: 25,
    previousLeaves: 0,
    joinDate: "2014-01-20",
    subjectsCovered: ["Software Engineering", "HCI", "Mobile Development"],
    classesAffected: ["CS-3A (SE)", "CS-4A (HCI)", "CS-4B (Mobile Dev)", "CS-3B (SE Lab)"],
    approvalLevel: "Management",
    academicYear: "2024-25",
    semester: "Full Academic Year",
  },
  {
    id: "L006",
    facultyId: "FAC007",
    facultyName: "Dr. Sanjay Kumar",
    department: "Computer Science",
    designation: "Assistant Professor",
    email: "sanjay.kumar@bestcollege.edu",
    phone: "+91-99876-54321",
    employeeId: "EMP007",
    from: "2025-09-28",
    to: "2025-09-29",
    days: 2,
    workingDays: 1,
    reason: "Emergency - Father hospitalized due to cardiac emergency. Immediate family support required for medical procedures and care coordination.",
    leaveType: "Emergency",
    priority: "Critical",
    status: "Approved",
    appliedDate: "2025-09-28",
    processedDate: "2025-09-28",
    processedBy: "HOD - Computer Science",
    note: "Emergency leave approved immediately. Please keep us updated on the situation. Our thoughts are with your family during this difficult time.",
    emergencyContact: "+91-99876-54322",
    substituteArranged: true,
    substituteFaculty: "Dr. Karthik Rao",
    medicalCertificate: false,
    leaveBalance: 23,
    previousLeaves: 2,
    joinDate: "2021-06-01",
    subjectsCovered: ["Computer Networks", "Web Development"],
    classesAffected: ["CS-3A (Networks)", "CS-2B (Web Dev Lab)"],
    approvalLevel: "HOD",
    academicYear: "2024-25",
    semester: "Semester 5",
  },
];

const styles = {
  page: "w-full max-w-full min-h-screen overflow-x-clip bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
  container: "w-full max-w-[1920px] mx-auto p-4 sm:p-6 lg:p-8 xl:p-12",

  // Header
  header: "mb-8",
  headerTitle: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent mb-3",
  headerSubtitle: "text-lg sm:text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-4",
  headerActions: "flex flex-col sm:flex-row gap-3",

  // Stats
  statsGrid: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8",
  statCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 p-4 lg:p-6",
  statIcon: "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-3 lg:mb-4 transition-transform group-hover:scale-110",
  statValue: "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1",
  statLabel: "text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium",

  // Filters Section
  filtersSection: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm p-4 lg:p-6 mb-8",
  filtersHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6",
  filtersTitle: "text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  filtersActions: "flex flex-wrap gap-2",
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  
  // Form Elements
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",

  // Leave Cards
  leaveGrid: "grid grid-cols-1 gap-6 mb-8",
  leaveCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6",
  cardHeader: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6",

  // Faculty Info
  facultyInfo: "flex items-start gap-4",
  avatar: "w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm lg:text-lg shrink-0 shadow-lg",
  facultyDetails: "min-w-0 flex-1",
  facultyName: "text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1",
  facultyMeta: "text-sm text-gray-600 dark:text-gray-400 space-y-1",

  // Status and Actions
  statusSection: "flex flex-col gap-2 lg:items-end",
  statusBadge: "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border",
  statusPending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  statusApproved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  statusRejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
  statusReview: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  statusCancelled: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-700",

  // Leave Details
  leaveDetails: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6",
  detailGroup: "space-y-2",
  detailLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  detailValue: "text-gray-900 dark:text-gray-100",

  // Content Sections
  reasonSection: "mb-6",
  reasonTitle: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2",
  reasonText: "p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 leading-relaxed",

  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonApprove: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
  buttonReject: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonWarning: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 shadow-sm hover:shadow-md",
  buttonDisabled: "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed",

  // Modal
  modalBackdrop: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  modal: "w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xl max-h-[90vh] overflow-y-auto",
  modalTitle: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2",
  modalTextarea: "w-full h-32 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none",
  modalActions: "flex gap-3 mt-6",

  // Tags and Pills
  tag: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
  tagType: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  tagPriority: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800",

  // Empty State
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Alert Messages
  alert: "p-4 rounded-xl border mb-6",
  alertInfo: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  alertWarning: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200",
  alertSuccess: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",

  // Progress Elements
  progressBar: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2",
  progressFill: "h-2 rounded-full transition-all",
};

export default function FacultyLeaveManagement() {
  const [statusFilter, setStatusFilter] = useState<LeaveStatus | "">("");
  const [typeFilter, setTypeFilter] = useState<LeaveType | "">("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "">("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState<Leave[]>(FACULTY_LEAVES);
  
  const [rejecting, setRejecting] = useState<Leave | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [selectedLeaves, setSelectedLeaves] = useState<Set<string>>(new Set());

  const deptRows = useMemo(
    () => rows.filter(r => r.department === HOD_DEPARTMENT),
    [rows]
  );

  const filtered = useMemo(() => {
    return deptRows
      .filter(r => (statusFilter ? r.status === statusFilter : true))
      .filter(r => (typeFilter ? r.leaveType === typeFilter : true))
      .filter(r => (priorityFilter ? r.priority === priorityFilter : true))
      .filter(r =>
        facultyFilter
          ? r.facultyName.toLowerCase().includes(facultyFilter.toLowerCase()) ||
            r.facultyId.toLowerCase().includes(facultyFilter.toLowerCase()) ||
            r.employeeId.toLowerCase().includes(facultyFilter.toLowerCase())
          : true
      )
      .filter(r => (from ? r.from >= from : true))
      .filter(r => (to ? r.to <= to : true))
      .filter(r => searchTerm ? (
        r.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true)
      .sort((a, b) => {
        const priorityOrder = { "Critical": 0, "Urgent": 1, "High": 2, "Medium": 3, "Low": 4 };
        const statusOrder = { "Pending": 0, "Under Review": 1, "Approved": 2, "Rejected": 3, "Cancelled": 4 };
        
        if (a.status !== b.status) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        if (a.priority !== b.priority) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      });
  }, [deptRows, statusFilter, typeFilter, priorityFilter, facultyFilter, from, to, searchTerm]);

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = deptRows.filter(r => {
      const leaveDate = new Date(r.appliedDate);
      return leaveDate.getMonth() === currentMonth && leaveDate.getFullYear() === currentYear;
    });

    return {
      total: deptRows.length,
      pending: deptRows.filter(r => r.status === "Pending").length,
      approved: deptRows.filter(r => r.status === "Approved").length,
      rejected: deptRows.filter(r => r.status === "Rejected").length,
      underReview: deptRows.filter(r => r.status === "Under Review").length,
      critical: deptRows.filter(r => r.priority === "Critical" || r.priority === "Urgent").length,
      thisMonth: thisMonth.length,
      avgDays: deptRows.length > 0 ? Math.round(deptRows.reduce((sum, r) => sum + r.days, 0) / deptRows.length) : 0,
    };
  }, [deptRows]);

  const approve = useCallback((id: string) => {
    setRows(prev =>
      prev.map(r => (r.id === id ? { 
        ...r, 
        status: "Approved", 
        processedDate: new Date().toISOString().slice(0, 10),
        processedBy: "HOD - Computer Science"
      } : r))
    );
  }, []);

  const startReject = useCallback((row: Leave) => {
    setRejecting(row);
    setRejectNote("");
  }, []);

  const confirmReject = useCallback(() => {
    if (!rejecting) return;
    setRows(prev =>
      prev.map(r =>
        r.id === rejecting.id ? { 
          ...r, 
          status: "Rejected", 
          note: rejectNote,
          processedDate: new Date().toISOString().slice(0, 10),
          processedBy: "HOD - Computer Science"
        } : r
      )
    );
    setRejecting(null);
    setRejectNote("");
  }, [rejecting, rejectNote]);

  const clearFilters = useCallback(() => {
    setStatusFilter("");
    setTypeFilter("");
    setPriorityFilter("");
    setFacultyFilter("");
    setFrom("");
    setTo("");
    setSearchTerm("");
  }, []);

  const exportCSV = useCallback(() => {
    const headers = [
      "Leave ID", "Faculty Name", "Employee ID", "Department", "Designation", 
      "Leave Type", "Priority", "From Date", "To Date", "Days", "Working Days",
      "Status", "Applied Date", "Processed Date", "Processed By", "Reason", 
      "Substitute Arranged", "Substitute Faculty", "Emergency Contact", "Leave Balance"
    ];
    const csvRows = [headers.join(",")];
    
    filtered.forEach(leave => {
      const row = [
        leave.id,
        `"${leave.facultyName}"`,
        leave.employeeId,
        leave.department,
        leave.designation,
        leave.leaveType,
        leave.priority,
        leave.from,
        leave.to,
        leave.days.toString(),
        leave.workingDays.toString(),
        leave.status,
        leave.appliedDate,
        leave.processedDate || "",
        leave.processedBy || "",
        `"${leave.reason.replace(/"/g, '""')}"`,
        leave.substituteArranged.toString(),
        leave.substituteFaculty || "",
        leave.emergencyContact || "",
        leave.leaveBalance.toString()
      ];
      csvRows.push(row.join(","));
    });

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `faculty_leave_requests_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800";
      case "Urgent": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      case "High": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  const getStatusBadgeClass = (status: LeaveStatus) => {
    switch (status) {
      case "Pending": return styles.statusPending;
      case "Approved": return styles.statusApproved;
      case "Rejected": return styles.statusRejected;
      case "Under Review": return styles.statusReview;
      case "Cancelled": return styles.statusCancelled;
      default: return styles.statusPending;
    }
  };

  const getLeaveTypeIcon = (type: LeaveType) => {
    switch (type) {
      case "Medical": return <Activity className="w-4 h-4" />;
      case "Conference": return <Globe className="w-4 h-4" />;
      case "Emergency": return <AlertCircle className="w-4 h-4" />;
      case "Sabbatical": return <BookOpen className="w-4 h-4" />;
      case "Personal": return <User className="w-4 h-4" />;
      case "Casual": return <Calendar className="w-4 h-4" />;
      case "Maternity": return <Users className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const leaveTypes = ["Casual", "Medical", "Emergency", "Conference", "Personal", "Maternity", "Sabbatical", "Compensatory"];
  const priorities = ["Low", "Medium", "High", "Urgent", "Critical"];
  const statuses = ["Pending", "Approved", "Rejected", "Under Review", "Cancelled"];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Faculty Leave Management</h1>
          <p className={styles.headerSubtitle}>
            <Shield className="w-6 h-6" />
            HOD Portal - {HOD_DEPARTMENT} Department Leave Requests
          </p>
          <div className={styles.headerActions}>
            <button onClick={exportCSV} className={`${styles.button} ${styles.buttonSecondary}`}>
              <Download className="w-5 h-5" />
              Export Report
            </button>
            <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
              <RefreshCw className="w-5 h-5" />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}>
              <FileText className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Requests</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <Clock className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.pending}</div>
            <div className={styles.statLabel}>Pending Review</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400`}>
              <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.approved}</div>
            <div className={styles.statLabel}>Approved</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400`}>
              <XCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.rejected}</div>
            <div className={styles.statLabel}>Rejected</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <AlertCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.critical}</div>
            <div className={styles.statLabel}>Priority Cases</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400`}>
              <TrendingUp className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.avgDays}</div>
            <div className={styles.statLabel}>Avg Days</div>
          </div>
        </div>

        {/* HOD Dashboard Alert */}
        <div className={`${styles.alert} ${styles.alertInfo}`}>
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <strong>HOD Authority:</strong> You can approve/reject leave requests for your department faculty. 
              Long-term leaves (30+ days) require Principal approval. Emergency and medical leaves can be processed immediately.
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <h2 className={styles.filtersTitle}>
              <Filter className="w-6 h-6" />
              Advanced Filters
            </h2>
            <div className={styles.filtersActions}>
              <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Search className="w-4 h-4" />
                Search
              </label>
              <input
                className={styles.input}
                placeholder="Faculty name, reason, leave ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Users className="w-4 h-4" />
                Faculty
              </label>
              <input
                className={styles.input}
                placeholder="Name, ID, Employee ID..."
                value={facultyFilter}
                onChange={e => setFacultyFilter(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Activity className="w-4 h-4" />
                Status
              </label>
              <select
                className={styles.select}
                value={statusFilter}
                onChange={e => setStatusFilter((e.target.value as LeaveStatus) || "")}
              >
                <option value="">All Status</option>
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <FileText className="w-4 h-4" />
                Leave Type
              </label>
              <select
                className={styles.select}
                value={typeFilter}
                onChange={e => setTypeFilter((e.target.value as LeaveType) || "")}
              >
                <option value="">All Types</option>
                {leaveTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Star className="w-4 h-4" />
                Priority
              </label>
              <select
                className={styles.select}
                value={priorityFilter}
                onChange={e => setPriorityFilter((e.target.value as Priority) || "")}
              >
                <option value="">All Priority</option>
                {priorities.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Calendar className="w-4 h-4" />
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={styles.input}
                  type="date"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  placeholder="From"
                />
                <input
                  className={styles.input}
                  type="date"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  placeholder="To"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Leave Requests */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <FileText className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Leave Requests Found</h3>
            <p className={styles.emptyText}>
              No leave requests match your current filter criteria. Try adjusting your search parameters.
            </p>
          </div>
        ) : (
          <div className={styles.leaveGrid}>
            {filtered.map((leave) => {
              const isExpanded = expandedCard === leave.id;
              const isUrgent = leave.priority === "Critical" || leave.priority === "Urgent";
              
              return (
                <div key={leave.id} className={styles.leaveCard}>
                  {/* Urgent Priority Indicator */}
                  {isUrgent && (
                    <div className="absolute top-4 right-4 animate-pulse">
                      <Bell className="w-5 h-5 text-red-500" />
                    </div>
                  )}

                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.facultyInfo}>
                      <div className={styles.avatar}>
                        {leave.facultyName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={styles.facultyDetails}>
                        <h3 className={styles.facultyName}>{leave.facultyName}</h3>
                        <div className={styles.facultyMeta}>
                          <div>{leave.designation} • {leave.department}</div>
                          <div className="flex items-center gap-2 text-xs">
                            <span>{leave.employeeId}</span>
                            <span>•</span>
                            <span>Balance: {leave.leaveBalance} days</span>
                            <span>•</span>
                            <span>Used: {leave.previousLeaves} days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.statusSection}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(leave.status)}`}>
                          {leave.status === "Pending" && <Clock className="w-4 h-4" />}
                          {leave.status === "Approved" && <CheckCircle className="w-4 h-4" />}
                          {leave.status === "Rejected" && <XCircle className="w-4 h-4" />}
                          {leave.status === "Under Review" && <Eye className="w-4 h-4" />}
                          {leave.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`${styles.tag} ${getPriorityColor(leave.priority)}`}>
                          {leave.priority}
                        </span>
                        <span className={`${styles.tag} ${styles.tagType}`}>
                          {getLeaveTypeIcon(leave.leaveType)}
                          {leave.leaveType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Leave Details */}
                  <div className={styles.leaveDetails}>
                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Calendar className="w-4 h-4" />
                        Leave Period
                      </div>
                      <div className={styles.detailValue}>
                        <div className="font-medium">
                          {new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {leave.days} total days ({leave.workingDays} working days)
                        </div>
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <CalendarDays className="w-4 h-4" />
                        Application Details
                      </div>
                      <div className={styles.detailValue}>
                        <div className="font-medium">Applied: {new Date(leave.appliedDate).toLocaleDateString()}</div>
                        {leave.processedDate && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Processed: {new Date(leave.processedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Users className="w-4 h-4" />
                        Coverage Arrangement
                      </div>
                      <div className={styles.detailValue}>
                        {leave.substituteArranged ? (
                          <div>
                            <div className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Arranged</div>
                            {leave.substituteFaculty && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {leave.substituteFaculty}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-amber-600 dark:text-amber-400 font-medium">
                            ⚠ Not Arranged
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Shield className="w-4 h-4" />
                        Approval Level
                      </div>
                      <div className={styles.detailValue}>
                        <span className={`${styles.tag} ${
                          leave.approvalLevel === "Management" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                          leave.approvalLevel === "Principal" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}>
                          {leave.approvalLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reason Section */}
                  <div className={styles.reasonSection}>
                    <h4 className={styles.reasonTitle}>
                      <MessageSquare className="w-4 h-4" />
                      Reason for Leave
                    </h4>
                    <div className={styles.reasonText}>
                      {leave.reason}
                    </div>
                  </div>

                  {/* Classes Affected */}
                  {leave.classesAffected.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Classes Affected
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {leave.classesAffected.map((cls, idx) => (
                          <span key={idx} className={`${styles.tag} bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300`}>
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {isExpanded && (
                    <>
                      {/* Contact and Personal Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Contact Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{leave.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{leave.phone}</span>
                            </div>
                            {leave.emergencyContact && (
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  Emergency: {leave.emergencyContact}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Employment Details
                          </h4>
                          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <div>Join Date: {new Date(leave.joinDate).toLocaleDateString()}</div>
                            <div>Academic Year: {leave.academicYear}</div>
                            <div>Semester: {leave.semester}</div>
                            <div className="flex items-center gap-2">
                              {leave.medicalCertificate ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              Medical Certificate {leave.medicalCertificate ? "Provided" : "Not Required"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Processing History */}
                      {(leave.processedBy || leave.note) && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Timer className="w-4 h-4" />
                            Processing History
                          </h4>
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                            {leave.processedBy && (
                              <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Processed by:</strong> {leave.processedBy}
                              </div>
                            )}
                            {leave.processedDate && (
                              <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Date:</strong> {new Date(leave.processedDate).toLocaleDateString()}
                              </div>
                            )}
                            {leave.note && (
                              <div className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>Comments:</strong> {leave.note}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Attachments */}
                      {leave.attachments && leave.attachments.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Attachments
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {leave.attachments.map((attachment, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                  {attachment}
                                </span>
                                <button className="ml-auto text-indigo-600 hover:text-indigo-500 text-xs">
                                  View
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Leave Balance Progress */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Leave Balance Overview
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Used: {leave.previousLeaves} days</span>
                            <span>Balance: {leave.leaveBalance} days</span>
                          </div>
                          <div className={styles.progressBar}>
                            <div 
                              className={`${styles.progressFill} ${
                                leave.previousLeaves > 20 ? "bg-red-500" : 
                                leave.previousLeaves > 15 ? "bg-amber-500" : "bg-emerald-500"
                              }`}
                              style={{ width: `${Math.min((leave.previousLeaves / 25) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : leave.id)}
                      className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                    >
                      <Eye className="w-4 h-4" />
                      {isExpanded ? 'Show Less' : 'View Details'}
                    </button>

                    {leave.status === "Pending" && (
                      <>
                        <button
                          onClick={() => approve(leave.id)}
                          className={`${styles.button} ${styles.buttonApprove} flex-1`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve Leave
                        </button>
                        <button
                          onClick={() => startReject(leave)}
                          className={`${styles.button} ${styles.buttonReject} flex-1`}
                        >
                          <XCircle className="w-4 h-4" />
                          Reject Leave
                        </button>
                      </>
                    )}

                    {(leave.status === "Approved" || leave.status === "Rejected") && (
                      <div className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                        Processed on {leave.processedDate && new Date(leave.processedDate).toLocaleDateString()}
                      </div>
                    )}

                    {leave.status === "Under Review" && (
                      <button className={`${styles.button} ${styles.buttonWarning} flex-1`}>
                        <Clock className="w-4 h-4" />
                        Under Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rejection Modal */}
        {rejecting && (
          <div className={styles.modalBackdrop} onClick={() => setRejecting(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <h3 className={styles.modalTitle}>
                <XCircle className="w-5 h-5 text-red-600" />
                Reject Leave Request
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <div className="text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {rejecting.facultyName}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {rejecting.leaveType} Leave: {new Date(rejecting.from).toLocaleDateString()} - {new Date(rejecting.to).toLocaleDateString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {rejecting.days} days • {rejecting.reason.substring(0, 100)}...
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please provide a detailed reason for rejecting this leave request. This will help the faculty member understand the decision and take appropriate action.
              </p>
              
              <textarea
                className={styles.modalTextarea}
                placeholder="Enter detailed rejection reason (required)..."
                value={rejectNote}
                onChange={e => setRejectNote(e.target.value)}
              />
              
              <div className={styles.modalActions}>
                <button 
                  onClick={() => setRejecting(null)}
                  className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  disabled={!rejectNote.trim()}
                  className={`${styles.button} ${rejectNote.trim() ? styles.buttonReject : styles.buttonDisabled} flex-1`}
                >
                  <Check className="w-4 h-4" />
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}