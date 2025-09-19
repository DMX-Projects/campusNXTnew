import React, { useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  GraduationCap,
  Filter,
  Search,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  User,
  Building,
  Hash,
  BookOpen,
  CalendarDays,
  Timer,
  FileText,
  Mail,
  Phone,
  TrendingUp,
  BarChart3,
  Edit,
  Save,
  RotateCcw,
  Plus,
  Star,
  Award,
  MapPin
} from "lucide-react";

type LeaveStatus = "Pending" | "Approved" | "Rejected";
type LeaveType = "Medical" | "Personal" | "Emergency" | "Academic" | "Family" | "Competition" | "Other";
type Priority = "Low" | "Medium" | "High" | "Urgent";

type StudentLeave = {
  id: string;
  studentName: string;
  rollNo: string;
  course: string;
  department: string;
  year: number;
  semester: number;
  section: string;
  email: string;
  phone: string;
  guardian: string;
  guardianPhone: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  leaveType: LeaveType;
  priority: Priority;
  status: LeaveStatus;
  appliedDate: string;
  processedDate?: string;
  processedBy?: string;
  hodNote?: string;
  attachments?: string[];
  emergencyContact?: string;
  medicalCertificate?: boolean;
  previousAttendance: number; // percentage
};

const HOD_DEPARTMENT = "Computer Science";

const STUDENT_LEAVES: StudentLeave[] = [
  {
    id: "SL001",
    studentName: "Rohit Kumar",
    rollNo: "CS21U001",
    course: "Machine Learning",
    department: "Computer Science",
    year: 3,
    semester: 5,
    section: "A",
    email: "rohit.cs21u001@bestcollege.edu",
    phone: "+91-98765-11111",
    guardian: "Raj Kumar",
    guardianPhone: "+91-98765-11112",
    from: "2025-09-25",
    to: "2025-09-27",
    days: 3,
    reason: "Participating in National Level Hackathon - representing college in AI/ML category. This is an excellent opportunity for practical learning and skill development.",
    leaveType: "Competition",
    priority: "High",
    status: "Pending",
    appliedDate: "2025-09-18",
    attachments: ["hackathon_invitation.pdf", "registration_proof.pdf"],
    emergencyContact: "+91-98765-11113",
    medicalCertificate: false,
    previousAttendance: 92,
  },
  {
    id: "SL002",
    studentName: "Priya Singh",
    rollNo: "CS21U002",
    course: "Operating Systems",
    department: "Computer Science",
    year: 3,
    semester: 5,
    section: "A",
    email: "priya.cs21u002@bestcollege.edu",
    phone: "+91-98765-22222",
    guardian: "Rajesh Singh",
    guardianPhone: "+91-98765-22223",
    from: "2025-09-22",
    to: "2025-09-22",
    days: 1,
    reason: "Medical consultation and diagnostic tests as recommended by family doctor due to recurring health issues.",
    leaveType: "Medical",
    priority: "Medium",
    status: "Approved",
    appliedDate: "2025-09-20",
    processedDate: "2025-09-21",
    processedBy: "HOD - Computer Science",
    hodNote: "Approved with medical certificate submission required within 2 days of return.",
    emergencyContact: "+91-98765-22224",
    medicalCertificate: true,
    previousAttendance: 88,
  },
  {
    id: "SL003",
    studentName: "Akash Mehta",
    rollNo: "CS21U003",
    course: "Database Systems",
    department: "Computer Science",
    year: 3,
    semester: 5,
    section: "B",
    email: "akash.cs21u003@bestcollege.edu",
    phone: "+91-98765-33333",
    guardian: "Suresh Mehta",
    guardianPhone: "+91-98765-33334",
    from: "2025-09-30",
    to: "2025-10-02",
    days: 3,
    reason: "Sister's wedding ceremony - important family function that requires travel to hometown for traditional ceremonies.",
    leaveType: "Family",
    priority: "Medium",
    status: "Pending",
    appliedDate: "2025-09-17",
    emergencyContact: "+91-98765-33335",
    medicalCertificate: false,
    previousAttendance: 85,
  },
  {
    id: "SL004",
    studentName: "Sneha Patel",
    rollNo: "CS22U004",
    course: "Data Structures",
    department: "Computer Science",
    year: 2,
    semester: 3,
    section: "A",
    email: "sneha.cs22u004@bestcollege.edu",
    phone: "+91-98765-44444",
    guardian: "Mukesh Patel",
    guardianPhone: "+91-98765-44445",
    from: "2025-09-24",
    to: "2025-09-26",
    days: 3,
    reason: "Sudden fever and flu symptoms - unable to attend classes due to health concerns and to prevent spread of illness.",
    leaveType: "Medical",
    priority: "High",
    status: "Rejected",
    appliedDate: "2025-09-23",
    processedDate: "2025-09-24",
    processedBy: "HOD - Computer Science",
    hodNote: "Medical certificate required for approval. Please reapply with proper medical documentation from registered practitioner.",
    emergencyContact: "+91-98765-44446",
    medicalCertificate: false,
    previousAttendance: 76,
  },
  {
    id: "SL005",
    studentName: "Arjun Sharma",
    rollNo: "CS22U005",
    course: "Operating Systems",
    department: "Computer Science",
    year: 2,
    semester: 3,
    section: "B",
    email: "arjun.cs22u005@bestcollege.edu",
    phone: "+91-98765-55555",
    guardian: "Vikram Sharma",
    guardianPhone: "+91-98765-55556",
    from: "2025-10-05",
    to: "2025-10-07",
    days: 3,
    reason: "Academic conference on emerging technologies in computer science - will enhance learning and provide exposure to latest industry trends.",
    leaveType: "Academic",
    priority: "Medium",
    status: "Approved",
    appliedDate: "2025-09-15",
    processedDate: "2025-09-17",
    processedBy: "HOD - Computer Science",
    hodNote: "Approved - excellent academic opportunity. Submit conference attendance certificate and learning report upon return.",
    attachments: ["conference_details.pdf", "registration_receipt.pdf"],
    emergencyContact: "+91-98765-55557",
    medicalCertificate: false,
    previousAttendance: 94,
  },
  {
    id: "SL006",
    studentName: "Kavya Reddy",
    rollNo: "CS23U006",
    course: "Programming Fundamentals",
    department: "Computer Science",
    year: 1,
    semester: 1,
    section: "A",
    email: "kavya.cs23u006@bestcollege.edu",
    phone: "+91-98765-66666",
    guardian: "Krishna Reddy",
    guardianPhone: "+91-98765-66667",
    from: "2025-09-28",
    to: "2025-09-29",
    days: 2,
    reason: "Emergency travel due to grandfather's critical health condition. Family needs immediate support during this difficult time.",
    leaveType: "Emergency",
    priority: "Urgent",
    status: "Pending",
    appliedDate: "2025-09-27",
    emergencyContact: "+91-98765-66668",
    medicalCertificate: false,
    previousAttendance: 90,
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

  // Filters
  filtersSection: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm p-4 lg:p-6 mb-8",
  filtersHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6",
  filtersTitle: "text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  filtersActions: "flex flex-wrap gap-2",
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",

  // Leave Cards
  leaveGrid: "grid grid-cols-1 gap-6 mb-8",
  leaveCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6",
  cardHeader: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6",

  // Student Info
  studentInfo: "flex items-start gap-4",
  avatar: "w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm lg:text-lg shrink-0",
  studentDetails: "min-w-0 flex-1",
  studentName: "text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1",
  studentMeta: "text-sm text-gray-600 dark:text-gray-400 space-y-1",

  // Status and Priority
  statusSection: "flex flex-col sm:flex-row gap-3 sm:items-center",
  statusBadge: "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border",
  statusPending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  statusApproved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  statusRejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",

  // Leave Details
  leaveDetails: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6",
  detailGroup: "space-y-2",
  detailLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  detailValue: "text-gray-900 dark:text-gray-100",

  // Reason Section
  reasonSection: "mb-6",
  reasonTitle: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2",
  reasonText: "p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300",

  // Action Buttons
  actionSection: "border-t border-gray-200 dark:border-gray-700 pt-6",
  actionButtons: "flex flex-col sm:flex-row gap-3",
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSuccess: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
  buttonDanger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonDisabled: "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed",

  // Modal
  modalBackdrop: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  modal: "w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xl",
  modalTitle: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2",
  modalTextarea: "w-full h-32 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none",
  modalActions: "flex gap-3 mt-6",

  // Tags and Pills
  tag: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
  tagType: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  tagPriority: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",

  // Empty State
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Attendance indicator
  attendanceBar: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2",
  attendanceFill: "h-2 rounded-full transition-all",
  attendanceText: "text-xs text-gray-600 dark:text-gray-400",
};

export default function HODStudentLeaveManagement() {
  const [rows, setRows] = useState<StudentLeave[]>(STUDENT_LEAVES);
  const [course, setCourse] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [leaveType, setLeaveType] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [rejecting, setRejecting] = useState<StudentLeave | null>(null);
  const [note, setNote] = useState<string>("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const deptRows = useMemo(
    () => rows.filter((r) => r.department === HOD_DEPARTMENT),
    [rows]
  );

  const courses = useMemo(
    () => Array.from(new Set(deptRows.map((r) => r.course))).sort(),
    [deptRows]
  );

  const leaveTypes = ["Medical", "Personal", "Emergency", "Academic", "Family", "Competition", "Other"];
  const priorities = ["Low", "Medium", "High", "Urgent"];
  const statuses = ["Pending", "Approved", "Rejected"];

  const filtered = useMemo(() => {
    return deptRows
      .filter((r) => (course ? r.course === course : true))
      .filter((r) => (status ? r.status === status : true))
      .filter((r) => (leaveType ? r.leaveType === leaveType : true))
      .filter((r) => (priority ? r.priority === priority : true))
      .filter((r) => (from ? r.from >= from : true))
      .filter((r) => (to ? r.to <= to : true))
      .filter((r) =>
        searchTerm
          ? r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.course.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .sort((a, b) => {
        // Sort by priority and date
        const priorityOrder = { "Urgent": 0, "High": 1, "Medium": 2, "Low": 3 };
        const statusOrder = { "Pending": 0, "Approved": 1, "Rejected": 2 };
        
        if (a.status !== b.status) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }, [deptRows, course, status, leaveType, priority, from, to, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: deptRows.length,
      pending: deptRows.filter((r) => r.status === "Pending").length,
      approved: deptRows.filter((r) => r.status === "Approved").length,
      rejected: deptRows.filter((r) => r.status === "Rejected").length,
      urgent: deptRows.filter((r) => r.priority === "Urgent").length,
      medical: deptRows.filter((r) => r.leaveType === "Medical").length,
    };
  }, [deptRows]);

  const approve = (id: string) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setRows((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status: "Approved",
            processedDate: currentDate,
            processedBy: "HOD - " + HOD_DEPARTMENT,
          };
        }
        return r;
      })
    );
  };

  const startReject = (leave: StudentLeave) => {
    setRejecting(leave);
    setNote("");
  };

  const confirmReject = () => {
    if (!rejecting) return;
    
    const currentDate = new Date().toISOString().slice(0, 10);
    setRows((prev) =>
      prev.map((r) =>
        r.id === rejecting.id
          ? {
              ...r,
              status: "Rejected",
              hodNote: note,
              processedDate: currentDate,
              processedBy: "HOD - " + HOD_DEPARTMENT,
            }
          : r
      )
    );
    setRejecting(null);
    setNote("");
  };

  const clearFilters = () => {
    setCourse("");
    setStatus("");
    setLeaveType("");
    setPriority("");
    setFrom("");
    setTo("");
    setSearchTerm("");
  };

  const exportCSV = () => {
    const headers = [
      "Roll No", "Name", "Course", "Leave Type", "From", "To", "Days", 
      "Priority", "Status", "Applied Date", "Reason", "Previous Attendance"
    ];
    const csvRows = [headers.join(",")];

    filtered.forEach((leave) => {
      const row = [
        leave.rollNo,
        leave.studentName,
        leave.course,
        leave.leaveType,
        leave.from,
        leave.to,
        leave.days.toString(),
        leave.priority,
        leave.status,
        leave.appliedDate,
        `"${leave.reason.replace(/"/g, '""')}"`,
        `${leave.previousAttendance}%`,
      ];
      csvRows.push(row.join(","));
    });

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student_leave_requests_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "Urgent": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "bg-emerald-500";
    if (percentage >= 80) return "bg-yellow-500";
    if (percentage >= 70) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Student Leave Management</h2>
          <p className={styles.headerSubtitle}>
            <Building className="w-6 h-6" />
            {HOD_DEPARTMENT} Department - HOD Approval System
          </p>
          <div className={styles.headerActions}>
            <button onClick={exportCSV} className={`${styles.button} ${styles.buttonSecondary}`}>
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats */}
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
            <div className={styles.statLabel}>Pending</div>
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
            <div className={styles.statValue}>{stats.urgent}</div>
            <div className={styles.statLabel}>Urgent</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400`}>
              <Plus className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.medical}</div>
            <div className={styles.statLabel}>Medical</div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <h2 className={styles.filtersTitle}>
              <Filter className="w-6 h-6" />
              Filter Requests
            </h2>
            <div className={styles.filtersActions}>
              <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
                <RotateCcw className="w-4 h-4" />
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
                placeholder="Name, Roll No, Course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <BookOpen className="w-4 h-4" />
                Course
              </label>
              <select
                className={styles.select}
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <AlertCircle className="w-4 h-4" />
                Status
              </label>
              <select
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                {statuses.map((s) => (
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
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="">All Types</option>
                {leaveTypes.map((t) => (
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
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">All Priority</option>
                {priorities.map((p) => (
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
                  onChange={(e) => setFrom(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Leave Requests */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <Users className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Leave Requests</h3>
            <p className={styles.emptyText}>
              No leave requests match your current filter criteria.
            </p>
          </div>
        ) : (
          <div className={styles.leaveGrid}>
            {filtered.map((leave) => {
              const isExpanded = expandedCard === leave.id;
              
              return (
                <div key={leave.id} className={styles.leaveCard}>
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.studentInfo}>
                      <div className={styles.avatar}>
                        {leave.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={styles.studentDetails}>
                        <h3 className={styles.studentName}>{leave.studentName}</h3>
                        <div className={styles.studentMeta}>
                          <div>{leave.rollNo} • Year {leave.year} • Sem {leave.semester} • Sec {leave.section}</div>
                          <div>{leave.course}</div>
                          <div>
                            <div className={styles.attendanceBar}>
                              <div 
                                className={`${styles.attendanceFill} ${getAttendanceColor(leave.previousAttendance)}`}
                                style={{ width: `${leave.previousAttendance}%` }}
                              />
                            </div>
                            <div className={styles.attendanceText}>
                              Previous Attendance: {leave.previousAttendance}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.statusSection}>
                      <div className="flex items-center gap-2">
                        <span className={`${styles.statusBadge} ${
                          leave.status === "Pending" ? styles.statusPending :
                          leave.status === "Approved" ? styles.statusApproved :
                          styles.statusRejected
                        }`}>
                          {leave.status === "Pending" && <Clock className="w-4 h-4" />}
                          {leave.status === "Approved" && <CheckCircle className="w-4 h-4" />}
                          {leave.status === "Rejected" && <XCircle className="w-4 h-4" />}
                          {leave.status}
                        </span>
                        <span className={`${styles.tag} ${getPriorityColor(leave.priority)}`}>
                          {leave.priority}
                        </span>
                        <span className={`${styles.tag} ${styles.tagType}`}>
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
                        <div>{new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{leave.days} day{leave.days !== 1 ? 's' : ''}</div>
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <CalendarDays className="w-4 h-4" />
                        Applied Date
                      </div>
                      <div className={styles.detailValue}>
                        {new Date(leave.appliedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Phone className="w-4 h-4" />
                        Emergency Contact
                      </div>
                      <div className={styles.detailValue}>
                        {leave.emergencyContact || leave.guardianPhone}
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <FileText className="w-4 h-4" />
                        Medical Certificate
                      </div>
                      <div className={styles.detailValue}>
                        {leave.medicalCertificate ? (
                          <span className="text-emerald-600 dark:text-emerald-400">✓ Provided</span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400">Not Required</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className={styles.reasonSection}>
                    <h4 className={styles.reasonTitle}>
                      <MessageSquare className="w-4 h-4" />
                      Reason for Leave
                    </h4>
                    <div className={styles.reasonText}>
                      {leave.reason}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <>
                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Student Contact
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
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Guardian Contact
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="text-gray-700 dark:text-gray-300">{leave.guardian}</div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{leave.guardianPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Processing Information */}
                      {(leave.processedDate || leave.hodNote) && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Timer className="w-4 h-4" />
                            Processing Details
                          </h4>
                          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            {leave.processedDate && (
                              <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                                Processed on: {new Date(leave.processedDate).toLocaleDateString()}
                              </div>
                            )}
                            {leave.processedBy && (
                              <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                                By: {leave.processedBy}
                              </div>
                            )}
                            {leave.hodNote && (
                              <div className="text-sm text-blue-700 dark:text-blue-300">
                                Note: {leave.hodNote}
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
                          <div className="space-y-2">
                            {leave.attachments.map((attachment, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                                <FileText className="w-4 h-4" />
                                {attachment}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Actions */}
                  <div className={styles.actionSection}>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : leave.id)}
                        className={`${styles.button} ${styles.buttonSecondary}`}
                      >
                        <Eye className="w-4 h-4" />
                        {isExpanded ? 'Show Less' : 'View Details'}
                      </button>

                      {leave.status === "Pending" && (
                        <>
                          <button
                            onClick={() => approve(leave.id)}
                            className={`${styles.button} ${styles.buttonSuccess}`}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => startReject(leave)}
                            className={`${styles.button} ${styles.buttonDanger}`}
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rejection Modal */}
        {rejecting && (
          <div className={styles.modalBackdrop} onClick={() => setRejecting(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3 className={styles.modalTitle}>
                <XCircle className="w-5 h-5 text-red-600" />
                Reject Leave Request
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please provide a detailed reason for rejecting {rejecting.studentName}'s leave request:
              </p>
              <textarea
                className={styles.modalTextarea}
                placeholder="Enter rejection reason (required)..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className={styles.modalActions}>
                <button
                  onClick={() => setRejecting(null)}
                  className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  disabled={!note.trim()}
                  className={`${styles.button} ${note.trim() ? styles.buttonDanger : styles.buttonDisabled} flex-1`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
