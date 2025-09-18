import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Building,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  X,
  Plus,
  Edit3,
  Archive,
  Shield,
  Activity,
  TrendingUp,
  BarChart3,
  Star,
  Award,
  BookOpen,
  MessageSquare,
  Settings,
  Info,
  Target,
  Briefcase,
  Globe,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  Edit
} from "lucide-react";
import { h2 } from "framer-motion/client";

type ReportStatus = "Submitted" | "Under Review" | "Approved" | "Rejected" | "Revision Required";
type ReportType = "Syllabus" | "Minutes" | "Activity" | "Research" | "Academic" | "Administrative" | "Assessment" | "Other";
type Priority = "Low" | "Medium" | "High" | "Urgent";

type Report = {
  id: string;
  name: string;
  description?: string;
  submittedBy: string;
  submittedByRole: string;
  department: string;
  type: ReportType;
  priority: Priority;
  date: string;
  dueDate?: string;
  status: ReportStatus;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  version: number;
  reviewedBy?: string;
  reviewedDate?: string;
  comments?: string;
  tags: string[];
  isConfidential: boolean;
  downloadCount: number;
  lastModified: string;
  academicYear: string;
  semester?: string;
  relatedCourse?: string;
  approvalRequired: boolean;
};

const HOD_DEPARTMENT = "Computer Science";

const INITIAL_REPORTS: Report[] = [
  {
    id: "R001",
    name: "Board of Studies Meeting Minutes - August 2025",
    description: "Comprehensive minutes from the monthly BoS meeting covering curriculum updates, faculty appointments, and research initiatives.",
    submittedBy: "Prof. Rahul Verma",
    submittedByRole: "Associate Professor",
    department: "Computer Science",
    type: "Minutes",
    priority: "High",
    date: "2025-08-30",
    status: "Approved",
    fileName: "bos-minutes-aug-2025.pdf",
    fileSize: 2456789,
    fileType: "application/pdf",
    version: 1,
    reviewedBy: "HOD - Computer Science",
    reviewedDate: "2025-09-01",
    comments: "Approved with no changes required. Well documented meeting proceedings.",
    tags: ["BoS", "Meeting", "Curriculum", "Official"],
    isConfidential: false,
    downloadCount: 15,
    lastModified: "2025-08-30",
    academicYear: "2024-25",
    semester: "Semester 1",
    approvalRequired: true,
  },
  {
    id: "R002",
    name: "Department Activity Report - September Week 2",
    description: "Bi-weekly activity summary including events, seminars, workshops, and student achievements in the department.",
    submittedBy: "Dr. Ananya Sharma",
    submittedByRole: "Professor",
    department: "Computer Science",
    type: "Activity",
    priority: "Medium",
    date: "2025-09-15",
    dueDate: "2025-09-20",
    status: "Under Review",
    fileName: "activity-sept-w2.docx",
    fileSize: 1234567,
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    version: 2,
    comments: "Please add more details about the industry collaboration event.",
    tags: ["Activities", "Events", "Weekly Report"],
    isConfidential: false,
    downloadCount: 8,
    lastModified: "2025-09-16",
    academicYear: "2024-25",
    semester: "Semester 1",
    approvalRequired: true,
  },
  {
    id: "R003",
    name: "Revised Syllabus - Database Systems (CS301)",
    description: "Updated syllabus for Database Systems course incorporating latest industry standards and practical components.",
    submittedBy: "Dr. Karthik Rao",
    submittedByRole: "Assistant Professor",
    department: "Computer Science",
    type: "Syllabus",
    priority: "High",
    date: "2025-09-10",
    dueDate: "2025-09-25",
    status: "Submitted",
    fileName: "db-syllabus-v3.pdf",
    fileSize: 890123,
    fileType: "application/pdf",
    version: 3,
    tags: ["Syllabus", "Database", "CS301", "Curriculum"],
    isConfidential: false,
    downloadCount: 12,
    lastModified: "2025-09-12",
    academicYear: "2024-25",
    semester: "Semester 5",
    relatedCourse: "CS301 - Database Systems",
    approvalRequired: true,
  },
  {
    id: "R004",
    name: "Research Publications Summary - Q3 2025",
    description: "Quarterly summary of research publications, citations, and ongoing research projects by department faculty.",
    submittedBy: "Dr. Priya Menon",
    submittedByRole: "Associate Professor",
    department: "Computer Science",
    type: "Research",
    priority: "Medium",
    date: "2025-09-18",
    status: "Approved",
    fileName: "research-summary-q3-2025.xlsx",
    fileSize: 567890,
    fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    version: 1,
    reviewedBy: "HOD - Computer Science",
    reviewedDate: "2025-09-18",
    comments: "Excellent progress in research activities. Approved for submission to administration.",
    tags: ["Research", "Publications", "Q3", "Faculty"],
    isConfidential: true,
    downloadCount: 5,
    lastModified: "2025-09-18",
    academicYear: "2024-25",
    approvalRequired: true,
  },
  {
    id: "R005",
    name: "Student Assessment Analysis - Mid-Term 2025",
    description: "Comprehensive analysis of mid-term examination results, performance trends, and improvement recommendations.",
    submittedBy: "Prof. Arjun Singh",
    submittedByRole: "Professor",
    department: "Computer Science",
    type: "Assessment",
    priority: "High",
    date: "2025-09-17",
    status: "Revision Required",
    fileName: "assessment-analysis-midterm-2025.pdf",
    fileSize: 1789012,
    fileType: "application/pdf",
    version: 1,
    reviewedBy: "HOD - Computer Science",
    reviewedDate: "2025-09-17",
    comments: "Please include comparative analysis with previous semester. Add section on improvement recommendations.",
    tags: ["Assessment", "Mid-term", "Analysis", "Performance"],
    isConfidential: true,
    downloadCount: 3,
    lastModified: "2025-09-17",
    academicYear: "2024-25",
    semester: "Semester 1",
    approvalRequired: true,
  },
  {
    id: "R006",
    name: "Industry Collaboration Report - September 2025",
    description: "Monthly report on industry partnerships, internship placements, and corporate training programs.",
    submittedBy: "Dr. Sanjay Kumar",
    submittedByRole: "Assistant Professor",
    department: "Computer Science",
    type: "Administrative",
    priority: "Medium",
    date: "2025-09-16",
    status: "Submitted",
    fileName: "industry-collaboration-sept-2025.docx",
    fileSize: 1123456,
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    version: 1,
    tags: ["Industry", "Collaboration", "Internships", "Partnerships"],
    isConfidential: false,
    downloadCount: 7,
    lastModified: "2025-09-16",
    academicYear: "2024-25",
    approvalRequired: false,
  }
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
  statsGrid: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-8",
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
  
  // Form Elements
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  textarea: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all backdrop-blur-sm",
  fileInput: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:transition-colors",

  // Report Cards
  reportGrid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8",
  reportCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6",
  cardHeader: "flex items-start justify-between gap-4 mb-6",

  // Report Info
  reportInfo: "flex-1 min-w-0",
  reportTitle: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2",
  reportMeta: "text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4",

  // Status Badges
  statusBadge: "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border",
  statusSubmitted: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  statusReview: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  statusApproved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  statusRejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
  statusRevision: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",

  // Details Grid
  detailsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",
  detailGroup: "space-y-2",
  detailLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  detailValue: "text-gray-900 dark:text-gray-100",

  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonSuccess: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
  buttonDanger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
  buttonWarning: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 shadow-sm hover:shadow-md",

  // Tags
  tag: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
  tagDefault: "bg-gray-100 text-gray-800 dark:bg-gray-800 text-gray-300 border border-gray-200 dark:border-gray-700",
  tagPrimary: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800",
  tagSuccess: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",

  // Modal
  modalBackdrop: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  modal: "w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden",
  modalHeader: "p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between",
  modalTitle: "text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  modalContent: "p-6 overflow-y-auto max-h-[calc(90vh-180px)]",
  modalFooter: "p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3",

  // Empty State
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Alert
  alert: "p-4 rounded-xl border mb-6",
  alertInfo: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  alertSuccess: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
  alertWarning: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200",
};

export default function HODReportsManagement() {
  const [rows, setRows] = useState<Report[]>(INITIAL_REPORTS);
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Upload modal state
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [uploadName, setUploadName] = useState<string>("");
  const [uploadDescription, setUploadDescription] = useState<string>("");
  const [uploadType, setUploadType] = useState<ReportType>("Other");
  const [uploadPriority, setUploadPriority] = useState<Priority>("Medium");
  const [uploadFileName, setUploadFileName] = useState<string>("");
  const [uploadTags, setUploadTags] = useState<string>("");
  const [uploadConfidential, setUploadConfidential] = useState<boolean>(false);
  const [uploadDueDate, setUploadDueDate] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const deptRows = useMemo(
    () => rows.filter(r => r.department === HOD_DEPARTMENT),
    [rows]
  );

  const types = useMemo(() => 
    Array.from(new Set(deptRows.map(r => r.type))).sort(), 
    [deptRows]
  );
  const statuses = useMemo(() => 
    Array.from(new Set(deptRows.map(r => r.status))).sort(), 
    [deptRows]
  );
  const priorities = ["Low", "Medium", "High", "Urgent"];
  const reportTypes = ["Syllabus", "Minutes", "Activity", "Research", "Academic", "Administrative", "Assessment", "Other"];

  const filtered = useMemo(() => {
    return deptRows
      .filter(r => (type ? r.type === type : true))
      .filter(r => (status ? r.status === status : true))
      .filter(r => (priority ? r.priority === priority : true))
      .filter(r => (from ? r.date >= from : true))
      .filter(r => (to ? r.date <= to : true))
      .filter(r => searchTerm ? (
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ) : true)
      .sort((a, b) => {
        const priorityOrder = { "Urgent": 0, "High": 1, "Medium": 2, "Low": 3 };
        const statusOrder = { 
          "Submitted": 0, 
          "Under Review": 1, 
          "Revision Required": 2, 
          "Approved": 3, 
          "Rejected": 4 
        };
        
        if (a.priority !== b.priority) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        if (a.status !== b.status) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [deptRows, type, status, priority, from, to, searchTerm]);

  const stats = useMemo(() => {
    const thisMonth = new Date().toISOString().slice(0, 7);
    const thisMonthReports = deptRows.filter(r => r.date.startsWith(thisMonth));
    
    return {
      total: deptRows.length,
      submitted: deptRows.filter(r => r.status === "Submitted").length,
      underReview: deptRows.filter(r => r.status === "Under Review").length,
      approved: deptRows.filter(r => r.status === "Approved").length,
      rejected: deptRows.filter(r => r.status === "Rejected").length,
      thisMonth: thisMonthReports.length,
      urgent: deptRows.filter(r => r.priority === "Urgent").length,
      confidential: deptRows.filter(r => r.isConfidential).length,
    };
  }, [deptRows]);

  const clearFilters = useCallback(() => {
    setType("");
    setStatus("");
    setPriority("");
    setFrom("");
    setTo("");
    setSearchTerm("");
  }, []);

  const handleUpload = useCallback(() => {
    if (!uploadName.trim() || !uploadFileName) {
      alert("Please provide a report name and select a file.");
      return;
    }

    const newReport: Report = {
      id: `R${String(rows.length + 1).padStart(3, "0")}`,
      name: uploadName,
      description: uploadDescription,
      submittedBy: "Faculty User",
      submittedByRole: "Faculty Member",
      department: HOD_DEPARTMENT,
      type: uploadType,
      priority: uploadPriority,
      date: new Date().toISOString().slice(0, 10),
      dueDate: uploadDueDate || undefined,
      status: "Submitted",
      fileName: uploadFileName,
      fileSize: Math.floor(Math.random() * 5000000) + 100000,
      fileType: uploadFileName.endsWith('.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      version: 1,
      tags: uploadTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      isConfidential: uploadConfidential,
      downloadCount: 0,
      lastModified: new Date().toISOString().slice(0, 10),
      academicYear: "2024-25",
      approvalRequired: uploadType !== "Other",
    };

    setRows(prev => [newReport, ...prev]);
    
    // Reset form
    setShowUpload(false);
    setUploadName("");
    setUploadDescription("");
    setUploadType("Other");
    setUploadPriority("Medium");
    setUploadFileName("");
    setUploadTags("");
    setUploadConfidential(false);
    setUploadDueDate("");
    if (fileRef.current) fileRef.current.value = "";
    
    alert("Report uploaded successfully.");
  }, [uploadName, uploadDescription, uploadType, uploadPriority, uploadFileName, uploadTags, uploadConfidential, uploadDueDate, rows.length]);

  const exportCSV = useCallback(() => {
    const headers = [
      "Report ID", "Name", "Submitted By", "Type", "Priority", "Status", 
      "Date", "File Name", "File Size", "Tags", "Confidential"
    ];
    const csvRows = [headers.join(",")];
    
    filtered.forEach(report => {
      const row = [
        report.id,
        `"${report.name}"`,
        report.submittedBy,
        report.type,
        report.priority,
        report.status,
        report.date,
        report.fileName || "",
        (report.fileSize || 0).toString(),
        `"${report.tags.join(', ')}"`,
        report.isConfidential.toString()
      ];
      csvRows.push(row.join(","));
    });

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `department_reports_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  const getStatusBadgeClass = (status: ReportStatus) => {
    switch (status) {
      case "Submitted": return styles.statusSubmitted;
      case "Under Review": return styles.statusReview;
      case "Approved": return styles.statusApproved;
      case "Rejected": return styles.statusRejected;
      case "Revision Required": return styles.statusRevision;
      default: return styles.statusSubmitted;
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName?: string) => {
    if (!fileName) return <FileText className="w-4 h-4" />;
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'doc':
      case 'docx': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'xls':
      case 'xlsx': return <FileText className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Department Reports</h2>
          <p className={styles.headerSubtitle}>
            <Shield className="w-6 h-6" />
            HOD Portal - {HOD_DEPARTMENT} Department Report Management
          </p>
          <div className={styles.headerActions}>
            <button onClick={exportCSV} className={`${styles.button} ${styles.buttonSecondary}`}>
              <Download className="w-5 h-5" />
              Export Reports
            </button>
            <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
              <RefreshCw className="w-5 h-5" />
              Reset Filters
            </button>
            <button onClick={() => setShowUpload(true)} className={`${styles.button} ${styles.buttonPrimary}`}>
              <Upload className="w-5 h-5" />
              Upload Report
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
            <div className={styles.statLabel}>Total Reports</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <Clock className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.submitted}</div>
            <div className={styles.statLabel}>Submitted</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <Eye className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.underReview}</div>
            <div className={styles.statLabel}>Under Review</div>
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
              <AlertCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.urgent}</div>
            <div className={styles.statLabel}>Urgent</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400`}>
              <Archive className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.thisMonth}</div>
            <div className={styles.statLabel}>This Month</div>
          </div>
        </div>

        {/* HOD Information Alert */}
        <div className={`${styles.alert} ${styles.alertInfo}`}>
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <strong>HOD Dashboard:</strong> Monitor and manage all department reports including syllabus updates, 
              meeting minutes, activity reports, and research documentation. Review submissions and track approval status.
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
                placeholder="Report name, author, tags..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <FileText className="w-4 h-4" />
                Report Type
              </label>
              <select
                className={styles.select}
                value={type}
                onChange={e => setType(e.target.value)}
              >
                <option value="">All Types</option>
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Activity className="w-4 h-4" />
                Status
              </label>
              <select
                className={styles.select}
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Target className="w-4 h-4" />
                Priority
              </label>
              <select
                className={styles.select}
                value={priority}
                onChange={e => setPriority(e.target.value)}
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
                />
                <input
                  className={styles.input}
                  type="date"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div className="font-medium">{filtered.length} Results</div>
                <div>of {deptRows.length} reports</div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <FileText className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Reports Found</h3>
            <p className={styles.emptyText}>
              No reports match your current filter criteria. Try adjusting your search parameters.
            </p>
          </div>
        ) : (
          <div className={styles.reportGrid}>
            {filtered.map((report) => {
              const isExpanded = expandedCard === report.id;
              const isOverdue = report.dueDate && new Date(report.dueDate) < new Date() && report.status === "Submitted";
              
              return (
                <div key={report.id} className={styles.reportCard}>
                  {/* Priority/Urgent Indicator */}
                  {(report.priority === "Urgent" || isOverdue) && (
                    <div className="absolute top-4 right-4">
                      <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                    </div>
                  )}

                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.reportInfo}>
                      <h3 className={styles.reportTitle}>{report.name}</h3>
                      <div className={styles.reportMeta}>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{report.submittedBy} • {report.submittedByRole}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(report.date).toLocaleDateString()}</span>
                          {report.dueDate && (
                            <>
                              <span>•</span>
                              <span className={isOverdue ? "text-red-600 dark:text-red-400" : ""}>
                                Due: {new Date(report.dueDate).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getFileIcon(report.fileName)}
                          <span>{report.fileName || "No file"}</span>
                          {report.fileSize && (
                            <>
                              <span>•</span>
                              <span>{formatFileSize(report.fileSize)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(report.status)}`}>
                        {report.status === "Submitted" && <Upload className="w-4 h-4" />}
                        {report.status === "Under Review" && <Eye className="w-4 h-4" />}
                        {report.status === "Approved" && <CheckCircle className="w-4 h-4" />}
                        {report.status === "Rejected" && <XCircle className="w-4 h-4" />}
                        {report.status === "Revision Required" && <Edit className="w-4 h-4" />}
                        {report.status}
                      </span>
                      <span className={`${styles.tag} ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <FileText className="w-4 h-4" />
                        Type & Version
                      </div>
                      <div className={styles.detailValue}>
                        <div className="font-medium">{report.type}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Version {report.version}
                          {report.isConfidential && " • Confidential"}
                        </div>
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Activity className="w-4 h-4" />
                        Engagement
                      </div>
                      <div className={styles.detailValue}>
                        <div className="font-medium">{report.downloadCount} downloads</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Last modified: {new Date(report.lastModified).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Preview */}
                  {report.description && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Description
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {report.description}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {report.tags.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {report.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className={`${styles.tag} ${styles.tagDefault}`}>
                            {tag}
                          </span>
                        ))}
                        {report.tags.length > 4 && (
                          <span className={`${styles.tag} ${styles.tagDefault}`}>
                            +{report.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {isExpanded && (
                    <>
                      {/* Full Description */}
                      {report.description && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Full Description
                          </h4>
                          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-sm">
                            {report.description}
                          </div>
                        </div>
                      )}

                      {/* Academic Information */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Academic Information
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Academic Year:</span>
                            <div className="text-gray-600 dark:text-gray-400">{report.academicYear}</div>
                          </div>
                          {report.semester && (
                            <div>
                              <span className="font-medium text-gray-700 dark:text-gray-300">Semester:</span>
                              <div className="text-gray-600 dark:text-gray-400">{report.semester}</div>
                            </div>
                          )}
                          {report.relatedCourse && (
                            <div className="sm:col-span-2">
                              <span className="font-medium text-gray-700 dark:text-gray-300">Related Course:</span>
                              <div className="text-gray-600 dark:text-gray-400">{report.relatedCourse}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Review Information */}
                      {(report.reviewedBy || report.comments) && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Review Information
                          </h4>
                          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            {report.reviewedBy && (
                              <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Reviewed by:</strong> {report.reviewedBy}
                                {report.reviewedDate && (
                                  <span> • {new Date(report.reviewedDate).toLocaleDateString()}</span>
                                )}
                              </div>
                            )}
                            {report.comments && (
                              <div className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>Comments:</strong> {report.comments}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* All Tags */}
                      {report.tags.length > 4 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            All Tags
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {report.tags.map((tag) => (
                              <span key={tag} className={`${styles.tag} ${styles.tagDefault}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : report.id)}
                      className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                    >
                      <Eye className="w-4 h-4" />
                      {isExpanded ? 'Show Less' : 'View Details'}
                    </button>

                    {report.fileName && (
                      <button 
                        onClick={() => alert(`Downloading ${report.fileName}`)}
                        className={`${styles.button} ${styles.buttonPrimary} flex-1`}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}

                    {report.status === "Submitted" && (
                      <button className={`${styles.button} ${styles.buttonSuccess} flex-1`}>
                        <CheckCircle className="w-4 h-4" />
                        Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upload Modal */}
        {showUpload && (
          <div className={styles.modalBackdrop} onClick={() => setShowUpload(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  <Upload className="w-5 h-5" />
                  Upload New Report
                </h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Report Name *
                    </label>
                    <input
                      className={styles.input}
                      placeholder="Enter report name"
                      value={uploadName}
                      onChange={e => setUploadName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      className={styles.textarea}
                      rows={3}
                      placeholder="Brief description of the report"
                      value={uploadDescription}
                      onChange={e => setUploadDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Report Type *
                      </label>
                      <select
                        className={styles.select}
                        value={uploadType}
                        onChange={e => setUploadType(e.target.value as ReportType)}
                      >
                        {reportTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority
                      </label>
                      <select
                        className={styles.select}
                        value={uploadPriority}
                        onChange={e => setUploadPriority(e.target.value as Priority)}
                      >
                        {priorities.map(priority => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Due Date (Optional)
                    </label>
                    <input
                      className={styles.input}
                      type="date"
                      value={uploadDueDate}
                      onChange={e => setUploadDueDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      className={styles.input}
                      placeholder="e.g., BoS, Meeting, Curriculum"
                      value={uploadTags}
                      onChange={e => setUploadTags(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select File *
                    </label>
                    <input
                      ref={fileRef}
                      className={styles.fileInput}
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={e => setUploadFileName(e.target.files?.[0]?.name || "")}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Supported formats: PDF, DOC, DOCX, XLS, XLSX
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="confidential"
                      checked={uploadConfidential}
                      onChange={e => setUploadConfidential(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="confidential" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Mark as confidential
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button 
                  onClick={() => setShowUpload(false)}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpload}
                  disabled={!uploadName.trim() || !uploadFileName}
                  className={`${styles.button} ${uploadName.trim() && uploadFileName ? styles.buttonPrimary : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                >
                  <Upload className="w-4 h-4" />
                  Upload Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
