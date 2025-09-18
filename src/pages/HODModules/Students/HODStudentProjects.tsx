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
  MapPin,
  Lightbulb,
  Code,
  Target,
  Briefcase,
  GitBranch,
  Zap,
  Database,
  Cpu,
  Globe,
  Layers
} from "lucide-react";

type ProjectStatus = "Proposed" | "In Progress" | "Completed" | "On Hold" | "Under Review";
type ProjectType = "Research" | "Application" | "System Design" | "Algorithm" | "Web Development" | "Mobile App" | "AI/ML" | "Data Analysis";
type Priority = "Low" | "Medium" | "High" | "Critical";

type Project = {
  id: string;
  title: string;
  studentName: string;
  rollNo: string;
  year: number;
  semester: number;
  section: string;
  course: string;
  department: string;
  status: ProjectStatus;
  projectType: ProjectType;
  priority: Priority;
  abstract: string;
  guide: string;
  coGuide?: string;
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  progressPercentage: number;
  technologies: string[];
  objectives: string[];
  deliverables: string[];
  challenges?: string;
  studentEmail: string;
  studentPhone: string;
  guideEmail: string;
  lastUpdated: string;
  githubRepo?: string;
  demoUrl?: string;
  documentation?: string[];
};

const HOD_DEPARTMENT = "Computer Science";

const PROJECTS: Project[] = [
  {
    id: "P001",
    title: "Edge-Optimized Vision Model for Real-Time Object Detection",
    studentName: "Rohit Kumar",
    rollNo: "CS21U001",
    year: 3,
    semester: 5,
    section: "A",
    course: "Machine Learning",
    department: "Computer Science",
    status: "In Progress",
    projectType: "AI/ML",
    priority: "High",
    abstract: "Implementing quantized CNNs for real-time edge inference on mobile devices. The project focuses on optimizing deep learning models for resource-constrained environments while maintaining accuracy.",
    guide: "Dr. Ananya Sharma",
    coGuide: "Prof. Rahul Verma",
    startDate: "2025-08-15",
    expectedEndDate: "2025-12-15",
    progressPercentage: 65,
    technologies: ["Python", "TensorFlow Lite", "OpenCV", "Raspberry Pi", "ONNX"],
    objectives: [
      "Reduce model size by 80% while maintaining 90% accuracy",
      "Achieve real-time inference on edge devices",
      "Implement quantization techniques"
    ],
    deliverables: [
      "Optimized model weights",
      "Mobile application",
      "Performance benchmarks",
      "Technical documentation"
    ],
    challenges: "Balancing model accuracy with computational efficiency on limited hardware resources.",
    studentEmail: "rohit.cs21u001@bestcollege.edu",
    studentPhone: "+91-98765-11111",
    guideEmail: "ananya.sharma@bestcollege.edu",
    lastUpdated: "2025-09-15",
    githubRepo: "https://github.com/rohitkumar/edge-vision",
    demoUrl: "https://edge-vision-demo.netlify.app",
    documentation: ["project_proposal.pdf", "mid_review.pdf", "technical_specs.pdf"],
  },
  {
    id: "P002",
    title: "Interactive Operating System Scheduler Visualizer",
    studentName: "Priya Singh",
    rollNo: "CS21U002",
    year: 3,
    semester: 5,
    section: "A",
    course: "Operating Systems",
    department: "Computer Science",
    status: "Completed",
    projectType: "System Design",
    priority: "Medium",
    abstract: "Interactive Gantt-based CPU scheduling simulator with multiple algorithms. Provides visual representation of process scheduling with performance metrics analysis.",
    guide: "Prof. Rahul Verma",
    startDate: "2025-07-01",
    expectedEndDate: "2025-11-30",
    actualEndDate: "2025-11-25",
    progressPercentage: 100,
    technologies: ["React", "JavaScript", "D3.js", "Node.js", "Express"],
    objectives: [
      "Implement 5+ scheduling algorithms",
      "Provide real-time visualization",
      "Generate performance reports"
    ],
    deliverables: [
      "Web application",
      "Algorithm implementations",
      "User manual",
      "Performance analysis report"
    ],
    challenges: "Ensuring accurate timing simulation and handling edge cases in scheduling algorithms.",
    studentEmail: "priya.cs21u002@bestcollege.edu",
    studentPhone: "+91-98765-22222",
    guideEmail: "rahul.verma@bestcollege.edu",
    lastUpdated: "2025-11-25",
    githubRepo: "https://github.com/priyasingh/os-scheduler",
    demoUrl: "https://os-scheduler-viz.vercel.app",
    documentation: ["final_report.pdf", "user_manual.pdf"],
  },
  {
    id: "P003",
    title: "Self-Tuning Database Indexes using Reinforcement Learning",
    studentName: "Akash Mehta",
    rollNo: "CS21U003",
    year: 3,
    semester: 5,
    section: "B",
    course: "Database Systems",
    department: "Computer Science",
    status: "Proposed",
    projectType: "Research",
    priority: "High",
    abstract: "Reinforcement learning approach for automatic database index optimization. The system learns query patterns and automatically creates, modifies, or drops indexes to improve performance.",
    guide: "Dr. Karthik Rao",
    startDate: "2025-09-01",
    expectedEndDate: "2026-01-15",
    progressPercentage: 15,
    technologies: ["Python", "PostgreSQL", "TensorFlow", "Docker", "Grafana"],
    objectives: [
      "Implement Q-learning for index selection",
      "Achieve 30% query performance improvement",
      "Reduce index maintenance overhead"
    ],
    deliverables: [
      "RL algorithm implementation",
      "Performance benchmarks",
      "Research paper",
      "System prototype"
    ],
    challenges: "Handling dynamic workloads and ensuring the RL agent doesn't create suboptimal index strategies.",
    studentEmail: "akash.cs21u003@bestcollege.edu",
    studentPhone: "+91-98765-33333",
    guideEmail: "karthik.rao@bestcollege.edu",
    lastUpdated: "2025-09-10",
    githubRepo: "https://github.com/akashmehta/auto-indexing",
    documentation: ["proposal.pdf", "literature_review.pdf"],
  },
  {
    id: "P004",
    title: "Blockchain-Based Academic Credential Verification System",
    studentName: "Sneha Patel",
    rollNo: "CS22U004",
    year: 2,
    semester: 3,
    section: "A",
    course: "Distributed Systems",
    department: "Computer Science",
    status: "In Progress",
    projectType: "Application",
    priority: "Medium",
    abstract: "Decentralized platform for issuing and verifying academic credentials using blockchain technology. Ensures tamper-proof and instantly verifiable certificates.",
    guide: "Prof. Arjun Singh",
    startDate: "2025-08-01",
    expectedEndDate: "2025-12-20",
    progressPercentage: 40,
    technologies: ["Ethereum", "Solidity", "React", "Web3.js", "IPFS", "MetaMask"],
    objectives: [
      "Deploy smart contracts for credential management",
      "Create user-friendly verification interface",
      "Ensure scalability and security"
    ],
    deliverables: [
      "Blockchain smart contracts",
      "Web application",
      "Mobile app",
      "Security audit report"
    ],
    challenges: "Gas optimization and ensuring user-friendly experience while maintaining blockchain security.",
    studentEmail: "sneha.cs22u004@bestcollege.edu",
    studentPhone: "+91-98765-44444",
    guideEmail: "arjun.singh@bestcollege.edu",
    lastUpdated: "2025-09-12",
    githubRepo: "https://github.com/snehapatel/blockchain-credentials",
    demoUrl: "https://credential-verify.netlify.app",
    documentation: ["blockchain_architecture.pdf", "smart_contract_specs.pdf"],
  },
  {
    id: "P005",
    title: "Real-Time Emotion Recognition System for E-Learning",
    studentName: "Arjun Sharma",
    rollNo: "CS22U005",
    year: 2,
    semester: 3,
    section: "B",
    course: "Computer Vision",
    department: "Computer Science",
    status: "Under Review",
    projectType: "AI/ML",
    priority: "High",
    abstract: "Computer vision system that analyzes student emotions during online learning sessions to provide adaptive learning experiences and attention tracking.",
    guide: "Dr. Priya Menon",
    startDate: "2025-07-15",
    expectedEndDate: "2025-11-30",
    progressPercentage: 80,
    technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "WebRTC", "Socket.io"],
    objectives: [
      "Achieve 95% emotion classification accuracy",
      "Real-time processing with low latency",
      "Privacy-preserving design"
    ],
    deliverables: [
      "Trained emotion recognition model",
      "Web application",
      "API documentation",
      "Privacy compliance report"
    ],
    challenges: "Ensuring privacy compliance while maintaining accuracy across diverse demographic groups.",
    studentEmail: "arjun.cs22u005@bestcollege.edu",
    studentPhone: "+91-98765-55555",
    guideEmail: "priya.menon@bestcollege.edu",
    lastUpdated: "2025-09-16",
    githubRepo: "https://github.com/arjunsharma/emotion-recognition",
    demoUrl: "https://emotion-elearning.herokuapp.com",
    documentation: ["model_architecture.pdf", "privacy_analysis.pdf", "user_study.pdf"],
  },
  {
    id: "P006",
    title: "IoT-Based Smart Campus Energy Management",
    studentName: "Kavya Reddy",
    rollNo: "CS23U006",
    year: 1,
    semester: 1,
    section: "A",
    course: "IoT Fundamentals",
    department: "Computer Science",
    status: "On Hold",
    projectType: "System Design",
    priority: "Low",
    abstract: "Comprehensive IoT solution for monitoring and optimizing energy consumption across campus facilities using sensor networks and predictive analytics.",
    guide: "Prof. Rahul Verma",
    startDate: "2025-08-20",
    expectedEndDate: "2026-03-15",
    progressPercentage: 25,
    technologies: ["Arduino", "Raspberry Pi", "MQTT", "Node.js", "InfluxDB", "Grafana"],
    objectives: [
      "Deploy 50+ IoT sensors across campus",
      "Achieve 20% energy savings",
      "Create predictive maintenance alerts"
    ],
    deliverables: [
      "IoT sensor network",
      "Data analytics dashboard",
      "Mobile monitoring app",
      "Energy optimization reports"
    ],
    challenges: "Sensor deployment logistics and ensuring reliable network connectivity across large campus area.",
    studentEmail: "kavya.cs23u006@bestcollege.edu",
    studentPhone: "+91-98765-66666",
    guideEmail: "rahul.verma@bestcollege.edu",
    lastUpdated: "2025-09-01",
    githubRepo: "https://github.com/kavyareddy/smart-campus-iot",
    documentation: ["iot_architecture.pdf", "sensor_specifications.pdf"],
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
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",

  // Project Cards
  projectGrid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8",
  projectCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6",
  cardHeader: "flex items-start justify-between gap-4 mb-4",

  // Project Info
  projectInfo: "flex-1 min-w-0",
  projectTitle: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2",
  projectMeta: "text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-3",

  // Status and Progress
  statusSection: "flex flex-col gap-2 mb-4",
  statusBadge: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
  statusProposed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  statusProgress: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  statusCompleted: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  statusHold: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
  statusReview: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",

  // Progress Bar
  progressContainer: "mb-4",
  progressBar: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2",
  progressFill: "h-2 rounded-full transition-all",
  progressText: "text-xs text-gray-600 dark:text-gray-400 flex justify-between",

  // Abstract
  abstractSection: "mb-4",
  abstractText: "text-sm text-gray-700 dark:text-gray-300 line-clamp-3",

  // Technologies
  techSection: "mb-4",
  techGrid: "flex flex-wrap gap-1",
  techTag: "inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",

  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",

  // Modal
  modalBackdrop: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  modal: "w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden",
  modalHeader: "p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between",
  modalTitle: "text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  modalContent: "p-6 overflow-y-auto max-h-[calc(90vh-120px)]",
  modalFooter: "p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3",

  // Empty State
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Detail Sections
  detailSection: "mb-6",
  detailTitle: "text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2",
  detailContent: "space-y-2",
  detailItem: "text-sm text-gray-700 dark:text-gray-300",

  // Links
  link: "text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm",
};

export default function StudentProjectsManagement() {
  const [course, setCourse] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [projectType, setProjectType] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [view, setView] = useState<Project | null>(null);

  const deptRows = useMemo(
    () => PROJECTS.filter((p) => p.department === HOD_DEPARTMENT),
    []
  );

  const courses = useMemo(
    () => Array.from(new Set(deptRows.map((p) => p.course))).sort(),
    [deptRows]
  );
  const years = useMemo(
    () => Array.from(new Set(deptRows.map((p) => p.year))).sort(),
    [deptRows]
  );
  const statuses = useMemo(
    () => Array.from(new Set(deptRows.map((p) => p.status))).sort(),
    [deptRows]
  );
  const projectTypes = ["Research", "Application", "System Design", "Algorithm", "Web Development", "Mobile App", "AI/ML", "Data Analysis"];
  const priorities = ["Low", "Medium", "High", "Critical"];

  const filtered = useMemo(() => {
    return deptRows
      .filter((p) => (course ? p.course === course : true))
      .filter((p) => (year ? p.year === Number(year) : true))
      .filter((p) => (status ? p.status === status : true))
      .filter((p) => (projectType ? p.projectType === projectType : true))
      .filter((p) => (priority ? p.priority === priority : true))
      .filter((p) =>
        searchTerm
          ? p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.guide.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .sort((a, b) => {
        const priorityOrder = { "Critical": 0, "High": 1, "Medium": 2, "Low": 3 };
        const statusOrder = { 
          "Under Review": 0,
          "In Progress": 1, 
          "Proposed": 2, 
          "On Hold": 3, 
          "Completed": 4 
        };
        
        if (a.status !== b.status) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }, [deptRows, course, year, status, projectType, priority, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: deptRows.length,
      proposed: deptRows.filter((p) => p.status === "Proposed").length,
      inProgress: deptRows.filter((p) => p.status === "In Progress").length,
      completed: deptRows.filter((p) => p.status === "Completed").length,
      onHold: deptRows.filter((p) => p.status === "On Hold").length,
      underReview: deptRows.filter((p) => p.status === "Under Review").length,
    };
  }, [deptRows]);

  const clearFilters = () => {
    setCourse("");
    setYear("");
    setStatus("");
    setProjectType("");
    setPriority("");
    setSearchTerm("");
  };

  const exportCSV = () => {
    const headers = [
      "Title", "Student", "Roll No", "Course", "Year", "Status", "Type", 
      "Priority", "Guide", "Progress %", "Start Date", "Expected End"
    ];
    const csvRows = [headers.join(",")];

    filtered.forEach((project) => {
      const row = [
        `"${project.title.replace(/"/g, '""')}"`,
        project.studentName,
        project.rollNo,
        project.course,
        project.year.toString(),
        project.status,
        project.projectType,
        project.priority,
        project.guide,
        `${project.progressPercentage}%`,
        project.startDate,
        project.expectedEndDate,
      ];
      csvRows.push(row.join(","));
    });

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student_projects_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadgeClass = (status: ProjectStatus) => {
    switch (status) {
      case "Proposed": return styles.statusProposed;
      case "In Progress": return styles.statusProgress;
      case "Completed": return styles.statusCompleted;
      case "On Hold": return styles.statusHold;
      case "Under Review": return styles.statusReview;
      default: return styles.statusProposed;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-emerald-500";
    if (percentage >= 60) return "bg-blue-500";
    if (percentage >= 40) return "bg-yellow-500";
    if (percentage >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  const getTypeIcon = (type: ProjectType) => {
    switch (type) {
      case "AI/ML": return <Cpu className="w-4 h-4" />;
      case "Web Development": return <Globe className="w-4 h-4" />;
      case "Mobile App": return <Lightbulb className="w-4 h-4" />;
      case "System Design": return <Layers className="w-4 h-4" />;
      case "Research": return <BookOpen className="w-4 h-4" />;
      case "Data Analysis": return <BarChart3 className="w-4 h-4" />;
      case "Algorithm": return <Code className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Student Projects Management</h2>
          <p className={styles.headerSubtitle}>
            <Building className="w-6 h-6" />
            {HOD_DEPARTMENT} Department - Project Portfolio
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
              <Briefcase className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Projects</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <Clock className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.inProgress}</div>
            <div className={styles.statLabel}>In Progress</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400`}>
              <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.completed}</div>
            <div className={styles.statLabel}>Completed</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <Eye className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.underReview}</div>
            <div className={styles.statLabel}>Under Review</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400`}>
              <Lightbulb className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.proposed}</div>
            <div className={styles.statLabel}>Proposed</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400`}>
              <AlertCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.onHold}</div>
            <div className={styles.statLabel}>On Hold</div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <h2 className={styles.filtersTitle}>
              <Filter className="w-6 h-6" />
              Filter Projects
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
                placeholder="Title, Student, Guide..."
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
                <GraduationCap className="w-4 h-4" />
                Year
              </label>
              <select
                className={styles.select}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>Year {y}</option>
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
                <Code className="w-4 h-4" />
                Project Type
              </label>
              <select
                className={styles.select}
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="">All Types</option>
                {projectTypes.map((t) => (
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
          </div>
        </div>

        {/* Project Cards */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <Briefcase className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Projects Found</h3>
            <p className={styles.emptyText}>
              No projects match your current filter criteria.
            </p>
          </div>
        ) : (
          <div className={styles.projectGrid}>
            {filtered.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <div className={styles.projectMeta}>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {project.studentName} ({project.rollNo})
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {project.course} • Year {project.year}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Guide: {project.guide}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.statusSection}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(project.status)}`}>
                      {getTypeIcon(project.projectType)}
                      {project.status}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {project.priority}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${getProgressColor(project.progressPercentage)}`}
                      style={{ width: `${project.progressPercentage}%` }}
                    />
                  </div>
                  <div className={styles.progressText}>
                    <span>Progress</span>
                    <span>{project.progressPercentage}%</span>
                  </div>
                </div>

                {/* Abstract */}
                <div className={styles.abstractSection}>
                  <p className={styles.abstractText}>{project.abstract}</p>
                </div>

                {/* Technologies */}
                <div className={styles.techSection}>
                  <div className={styles.techGrid}>
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className={styles.techTag}>
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => setView(project)}
                  className={`${styles.button} ${styles.buttonPrimary} w-full`}
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        {view && (
          <div className={styles.modalBackdrop} onClick={() => setView(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  <Briefcase className="w-6 h-6" />
                  Project Details
                </h2>
                <button
                  onClick={() => setView(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className={styles.detailSection}>
                      <h3 className={styles.detailTitle}>
                        <FileText className="w-5 h-5" />
                        Project Information
                      </h3>
                      <div className={styles.detailContent}>
                        <div className="mb-4">
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                            {view.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`${styles.statusBadge} ${getStatusBladgeClass(view.status)}`}>
                              {view.status}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {view.projectType}
                            </span>
                          </div>
                        </div>
                        <div className={styles.detailItem}>
                          <strong>Student:</strong> {view.studentName} ({view.rollNo})
                        </div>
                        <div className={styles.detailItem}>
                          <strong>Course:</strong> {view.course}
                        </div>
                        <div className={styles.detailItem}>
                          <strong>Year/Semester:</strong> {view.year}/{view.semester}
                        </div>
                        <div className={styles.detailItem}>
                          <strong>Section:</strong> {view.section}
                        </div>
                        <div className={styles.detailItem}>
                          <strong>Guide:</strong> {view.guide}
                        </div>
                        {view.coGuide && (
                          <div className={styles.detailItem}>
                            <strong>Co-Guide:</strong> {view.coGuide}
                          </div>
                        )}
                        <div className={styles.detailItem}>
                          <strong>Priority:</strong> {view.priority}
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className={styles.detailSection}>
                      <h3 className={styles.detailTitle}>
                        <Calendar className="w-5 h-5" />
                        Timeline
                      </h3>
                      <div className={styles.detailContent}>
                        <div className={styles.detailItem}>
                          <strong>Start Date:</strong> {new Date(view.startDate).toLocaleDateString()}
                        </div>
                        <div className={styles.detailItem}>
                          <strong>Expected End:</strong> {new Date(view.expectedEndDate).toLocaleDateString()}
                        </div>
                        {view.actualEndDate && (
                          <div className={styles.detailItem}>
                            <strong>Actual End:</strong> {new Date(view.actualEndDate).toLocaleDateString()}
                          </div>
                        )}
                        <div className={styles.detailItem}>
                          <strong>Last Updated:</strong> {new Date(view.lastUpdated).toLocaleDateString()}
                        </div>
                        
                        {/* Progress */}
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{view.progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${getProgressColor(view.progressPercentage)}`}
                              style={{ width: `${view.progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className={styles.detailSection}>
                      <h3 className={styles.detailTitle}>
                        <Code className="w-5 h-5" />
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {view.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Abstract */}
                    <div className={styles.detailSection}>
                      <h3 className={styles.detailTitle}>
                        <MessageSquare className="w-5 h-5" />
                        Abstract
                      </h3>
                      <p className={styles.detailItem}>{view.abstract}</p>
                    </div>

                    {/* Objectives */}
                    <div className={styles.detailSection}>
                      <h3 className={styles.detailTitle}>
                        <Target className="w-5 h-5" />
                        Objectives
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {view.objectives.map((objective, idx) => (
                          <li key={idx} className={styles.detailItem}>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className={styles.detailSection}>
                      <h3 className={styles.detailTitle}>
                        <CheckCircle className="w-5 h-5" />
                        Deliverables
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {view.deliverables.map((deliverable, idx) => (
                          <li key={idx} className={styles.detailItem}>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    {view.challenges && (
                      <div className={styles.detailSection}>
                        <h3 className={styles.detailTitle}>
                          <AlertCircle className="w-5 h-5" />
                          Challenges
                        </h3>
                        <p className={styles.detailItem}>{view.challenges}</p>
                      </div>
                    )}

                    {/* Contact Information */}
                    <div className={styles.detailSection}>
                      <h3 className={styles.detailTitle}>
                        <Mail className="w-5 h-5" />
                        Contact Information
                      </h3>
                      <div className={styles.detailContent}>
                        <div className={styles.detailItem}>
                          <strong>Student:</strong> {view.studentEmail}
                        </div>
                        <div className={styles.detailItem}>
                          <strong>Phone:</strong> {view.studentPhone}
                        </div>
                        <div className={styles.detailItem}>
                          <strong>Guide:</strong> {view.guideEmail}
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className={styles.detailSection}>
                      <h3 className={styles.detailTitle}>
                        <Globe className="w-5 h-5" />
                        Project Links
                      </h3>
                      <div className={styles.detailContent}>
                        {view.githubRepo && (
                          <div className={styles.detailItem}>
                            <strong>GitHub:</strong>{" "}
                            <a
                              href={view.githubRepo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.link}
                            >
                              {view.githubRepo}
                            </a>
                          </div>
                        )}
                        {view.demoUrl && (
                          <div className={styles.detailItem}>
                            <strong>Demo:</strong>{" "}
                            <a
                              href={view.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.link}
                            >
                              {view.demoUrl}
                            </a>
                          </div>
                        )}
                        {view.documentation && view.documentation.length > 0 && (
                          <div className={styles.detailItem}>
                            <strong>Documentation:</strong>
                            <ul className="mt-1 space-y-1">
                              {view.documentation.map((doc, idx) => (
                                <li key={idx} className="text-sm">
                                  📄 {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  onClick={() => setView(null)}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
