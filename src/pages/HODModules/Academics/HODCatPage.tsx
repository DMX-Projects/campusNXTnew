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
  Info,
  GraduationCap,
  ClipboardList,
  Archive,
  ExternalLink
} from "lucide-react";

type CatStatus = "Scheduled" | "Completed" | "Cancelled" | "In Progress" | "Postponed" | "Under Review";
type TestType = "CAT-1" | "CAT-2" | "CAT-3" | "Mid Term" | "Final" | "Surprise Test" | "Assignment";
type Difficulty = "Easy" | "Medium" | "Hard" | "Very Hard";

type CAT = {
  id: string;
  testName: TestType;
  course: string;
  subject: string;
  department: string;
  faculty: string;
  facultyId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  maxMarks: number;
  passingMarks: number;
  status: CatStatus;
  difficulty: Difficulty;
  syllabus: string[];
  instructions: string;
  venue: string;
  totalStudents: number;
  registeredStudents: number;
  completedStudents: number;
  averageScore?: number;
  highestScore?: number;
  lowestScore?: number;
  createdBy: "Examination Cell";
  createdDate: string;
  lastModified: string;
  semester: number;
  academicYear: string;
  questionPaper?: string;
  answerKey?: string;
  results?: string;
  specialInstructions?: string;
  isOnline: boolean;
  platform?: string;
  proctor: string;
};

const HOD_DEPARTMENT = "Computer Science";

const CATS_DATA: CAT[] = [
  {
    id: "CAT001",
    testName: "CAT-1",
    course: "B.Tech CSE",
    subject: "Operating Systems",
    department: "Computer Science",
    faculty: "Prof. Rahul Verma",
    facultyId: "FAC002",
    startDate: "2025-09-25",
    endDate: "2025-09-25",
    startTime: "10:00",
    endTime: "11:30",
    duration: 90,
    maxMarks: 100,
    passingMarks: 40,
    status: "Scheduled",
    difficulty: "Medium",
    syllabus: ["Process Management", "CPU Scheduling", "Synchronization", "Deadlocks"],
    instructions: "Closed book exam. No electronic devices allowed. Answer all questions. Show all working for numerical problems.",
    venue: "CSE Block - Hall A",
    totalStudents: 120,
    registeredStudents: 115,
    completedStudents: 0,
    createdBy: "Examination Cell",
    createdDate: "2025-09-15",
    lastModified: "2025-09-18",
    semester: 3,
    academicYear: "2024-25",
    specialInstructions: "Students must carry their ID cards and hall tickets.",
    isOnline: false,
    proctor: "Dr. Karthik Rao"
  },
  {
    id: "CAT002",
    testName: "CAT-1",
    course: "B.Tech CSE",
    subject: "Machine Learning",
    department: "Computer Science",
    faculty: "Dr. Ananya Sharma",
    facultyId: "FAC001",
    startDate: "2025-09-27",
    endDate: "2025-09-27",
    startTime: "14:00",
    endTime: "15:30",
    duration: 90,
    maxMarks: 100,
    passingMarks: 40,
    status: "Scheduled",
    difficulty: "Hard",
    syllabus: ["Linear Regression", "Logistic Regression", "Decision Trees", "Neural Networks Basics"],
    instructions: "Open book exam. Calculators allowed. Programming questions require Python syntax.",
    venue: "CSE Block - Lab 1",
    totalStudents: 85,
    registeredStudents: 82,
    completedStudents: 0,
    createdBy: "Examination Cell",
    createdDate: "2025-09-16",
    lastModified: "2025-09-18",
    semester: 7,
    academicYear: "2024-25",
    questionPaper: "ml_cat1_questions.pdf",
    specialInstructions: "Bring laptops with Python environment setup.",
    isOnline: false,
    proctor: "Prof. Arjun Singh"
  },
  {
    id: "CAT003",
    testName: "CAT-2",
    course: "B.Tech CSE",
    subject: "Database Systems",
    department: "Computer Science",
    faculty: "Dr. Karthik Rao",
    facultyId: "FAC004",
    startDate: "2025-08-28",
    endDate: "2025-08-28",
    startTime: "09:00",
    endTime: "10:30",
    duration: 90,
    maxMarks: 100,
    passingMarks: 40,
    status: "Completed",
    difficulty: "Medium",
    syllabus: ["SQL Queries", "Normalization", "Transactions", "Indexing"],
    instructions: "Closed book exam. SQL syntax must be precise. Draw ER diagrams clearly.",
    venue: "CSE Block - Hall B",
    totalStudents: 110,
    registeredStudents: 108,
    completedStudents: 105,
    averageScore: 76.5,
    highestScore: 98,
    lowestScore: 35,
    createdBy: "Examination Cell",
    createdDate: "2025-08-15",
    lastModified: "2025-08-30",
    semester: 5,
    academicYear: "2024-25",
    questionPaper: "dbms_cat2_questions.pdf",
    answerKey: "dbms_cat2_answers.pdf",
    results: "dbms_cat2_results.xlsx",
    isOnline: false,
    proctor: "Prof. Rahul Verma"
  },
  {
    id: "CAT004",
    testName: "CAT-1",
    course: "B.Tech CSE",
    subject: "Data Structures",
    department: "Computer Science",
    faculty: "Dr. Priya Menon",
    facultyId: "FAC005",
    startDate: "2025-09-30",
    endDate: "2025-09-30",
    startTime: "11:00",
    endTime: "12:30",
    duration: 90,
    maxMarks: 100,
    passingMarks: 40,
    status: "In Progress",
    difficulty: "Hard",
    syllabus: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees"],
    instructions: "Programming exam on computers. Implement algorithms in C/C++. Time complexity analysis required.",
    venue: "CSE Block - Lab 2",
    totalStudents: 95,
    registeredStudents: 92,
    completedStudents: 45,
    createdBy: "Examination Cell",
    createdDate: "2025-09-20",
    lastModified: "2025-09-30",
    semester: 3,
    academicYear: "2024-25",
    isOnline: true,
    platform: "HackerRank",
    proctor: "Dr. Ananya Sharma"
  },
  {
    id: "CAT005",
    testName: "CAT-3",
    course: "B.Tech CSE",
    subject: "Computer Networks",
    department: "Computer Science",
    faculty: "Dr. Sanjay Kumar",
    facultyId: "FAC007",
    startDate: "2025-10-05",
    endDate: "2025-10-05",
    startTime: "15:00",
    endTime: "16:30",
    duration: 90,
    maxMarks: 100,
    passingMarks: 40,
    status: "Postponed",
    difficulty: "Medium",
    syllabus: ["OSI Model", "TCP/IP", "Routing Protocols", "Network Security"],
    instructions: "Mixed exam with MCQs and descriptive answers. Network diagrams must be labeled properly.",
    venue: "CSE Block - Hall C",
    totalStudents: 100,
    registeredStudents: 96,
    completedStudents: 0,
    createdBy: "Examination Cell",
    createdDate: "2025-09-25",
    lastModified: "2025-10-01",
    semester: 5,
    academicYear: "2024-25",
    specialInstructions: "Postponed due to faculty unavailability. New date will be announced.",
    isOnline: false,
    proctor: "Prof. Arjun Singh"
  },
  {
    id: "CAT006",
    testName: "Mid Term",
    course: "B.Tech CSE",
    subject: "Software Engineering",
    department: "Computer Science",
    faculty: "Prof. Arjun Singh",
    facultyId: "FAC006",
    startDate: "2025-10-15",
    endDate: "2025-10-15",
    startTime: "09:00",
    endTime: "12:00",
    duration: 180,
    maxMarks: 200,
    passingMarks: 80,
    status: "Under Review",
    difficulty: "Hard",
    syllabus: ["SDLC Models", "Requirements Engineering", "Design Patterns", "Testing", "Project Management"],
    instructions: "Comprehensive exam covering first half of syllabus. Case study analysis required. UML diagrams must be precise.",
    venue: "Main Auditorium",
    totalStudents: 140,
    registeredStudents: 135,
    completedStudents: 0,
    createdBy: "Examination Cell",
    createdDate: "2025-10-01",
    lastModified: "2025-10-10",
    semester: 6,
    academicYear: "2024-25",
    specialInstructions: "Seating arrangement will be provided 2 days before exam. Bring geometry box for diagrams.",
    isOnline: false,
    proctor: "Dr. Karthik Rao"
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
  
  // Form Elements
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",

  // CAT Cards
  catGrid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8",
  catCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6",
  cardHeader: "flex items-start justify-between gap-4 mb-6",

  // Test Info
  testInfo: "flex-1 min-w-0",
  testTitle: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2",
  testMeta: "text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4",

  // Status Badges
  statusBadge: "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border",
  statusScheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  statusProgress: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  statusCompleted: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  statusCancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
  statusPostponed: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  statusReview: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-700",

  // Details Grid
  detailsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",
  detailGroup: "space-y-2",
  detailLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  detailValue: "text-gray-900 dark:text-gray-100",

  // Progress Elements
  progressContainer: "mb-4",
  progressBar: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2",
  progressFill: "h-2 rounded-full transition-all",
  progressText: "text-xs text-gray-600 dark:text-gray-400 flex justify-between",

  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonSuccess: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
  buttonWarning: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 shadow-sm hover:shadow-md",

  // Tags
  tag: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
  tagDifficulty: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
  tagType: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800",

  // Empty State
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Alert
  alert: "p-4 rounded-xl border mb-6",
  alertInfo: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200",
};

export default function HODCATManagement() {
  const [course, setCourse] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [status, setStatus] = useState<CatStatus | "">("");
  const [testType, setTestType] = useState<TestType | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const deptRows = useMemo(() => 
    CATS_DATA.filter(c => c.department === HOD_DEPARTMENT), 
    []
  );

  const courses = useMemo(
    () => Array.from(new Set(deptRows.map(d => d.course))).sort(),
    [deptRows]
  );

  const subjects = useMemo(
    () => Array.from(new Set(deptRows.map(d => d.subject))).sort(),
    [deptRows]
  );

  const testTypes = ["CAT-1", "CAT-2", "CAT-3", "Mid Term", "Final", "Surprise Test", "Assignment"];
  const difficulties = ["Easy", "Medium", "Hard", "Very Hard"];
  const statuses = ["Scheduled", "Completed", "Cancelled", "In Progress", "Postponed", "Under Review"];

  const filtered = useMemo(() => {
    return deptRows
      .filter(r => (course ? r.course === course : true))
      .filter(r => (subject ? r.subject === subject : true))
      .filter(r => (status ? r.status === status : true))
      .filter(r => (testType ? r.testName === testType : true))
      .filter(r => (difficulty ? r.difficulty === difficulty : true))
      .filter(r => (from ? r.startDate >= from : true))
      .filter(r => (to ? r.endDate <= to : true))
      .filter(r => searchTerm ? (
        r.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.venue.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true)
      .sort((a, b) => {
        const statusOrder = { 
          "In Progress": 0, 
          "Scheduled": 1, 
          "Under Review": 2, 
          "Postponed": 3, 
          "Completed": 4, 
          "Cancelled": 5 
        };
        
        if (a.status !== b.status) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      });
  }, [deptRows, course, subject, status, testType, difficulty, from, to, searchTerm]);

  const stats = useMemo(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const upcoming = deptRows.filter(r => r.startDate >= currentDate && r.status === "Scheduled");
    const thisWeek = deptRows.filter(r => {
      const testDate = new Date(r.startDate);
      const today = new Date();
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);
      return testDate >= today && testDate <= weekFromNow && r.status === "Scheduled";
    });

    return {
      total: deptRows.length,
      scheduled: deptRows.filter(r => r.status === "Scheduled").length,
      completed: deptRows.filter(r => r.status === "Completed").length,
      inProgress: deptRows.filter(r => r.status === "In Progress").length,
      upcoming: upcoming.length,
      thisWeek: thisWeek.length,
      totalStudents: deptRows.reduce((sum, r) => sum + r.totalStudents, 0),
      avgScore: deptRows.filter(r => r.averageScore).length > 0 ? 
        Math.round(deptRows.filter(r => r.averageScore).reduce((sum, r) => sum + (r.averageScore || 0), 0) / 
        deptRows.filter(r => r.averageScore).length) : 0,
    };
  }, [deptRows]);

  const clearFilters = useCallback(() => {
    setCourse("");
    setSubject("");
    setStatus("");
    setTestType("");
    setDifficulty("");
    setFrom("");
    setTo("");
    setSearchTerm("");
  }, []);

  const exportCSV = useCallback(() => {
    const headers = [
      "Test ID", "Test Name", "Subject", "Course", "Faculty", "Date", "Time", 
      "Duration", "Max Marks", "Venue", "Status", "Registered Students", 
      "Completed Students", "Average Score", "Difficulty"
    ];
    const csvRows = [headers.join(",")];
    
    filtered.forEach(cat => {
      const row = [
        cat.id,
        cat.testName,
        cat.subject,
        cat.course,
        cat.faculty,
        cat.startDate,
        `${cat.startTime}-${cat.endTime}`,
        `${cat.duration} min`,
        cat.maxMarks.toString(),
        cat.venue,
        cat.status,
        cat.registeredStudents.toString(),
        cat.completedStudents.toString(),
        (cat.averageScore || 0).toString(),
        cat.difficulty
      ];
      csvRows.push(row.map(cell => `"${cell}"`).join(","));
    });

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cat_schedule_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  const getStatusBadgeClass = (status: CatStatus) => {
    switch (status) {
      case "Scheduled": return styles.statusScheduled;
      case "In Progress": return styles.statusProgress;
      case "Completed": return styles.statusCompleted;
      case "Cancelled": return styles.statusCancelled;
      case "Postponed": return styles.statusPostponed;
      case "Under Review": return styles.statusReview;
      default: return styles.statusScheduled;
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Hard": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Very Hard": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-emerald-500";
    if (percentage >= 60) return "bg-blue-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Continuous Assessment Tests</h2>
          <p className={styles.headerSubtitle}>
            <ClipboardList className="w-6 h-6" />
            HOD Portal - {HOD_DEPARTMENT} Department CAT Schedule
          </p>
          <div className={styles.headerActions}>
            <button onClick={exportCSV} className={`${styles.button} ${styles.buttonSecondary}`}>
              <Download className="w-5 h-5" />
              Export Schedule
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
              <ClipboardList className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Tests</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400`}>
              <Calendar className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.scheduled}</div>
            <div className={styles.statLabel}>Scheduled</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400`}>
              <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.completed}</div>
            <div className={styles.statLabel}>Completed</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <Activity className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.inProgress}</div>
            <div className={styles.statLabel}>In Progress</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <Users className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.totalStudents}</div>
            <div className={styles.statLabel}>Total Students</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400`}>
              <TrendingUp className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.avgScore}%</div>
            <div className={styles.statLabel}>Avg Score</div>
          </div>
        </div>

        {/* HOD Information Alert */}
        <div className={`${styles.alert} ${styles.alertInfo}`}>
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <strong>HOD Overview:</strong> Monitor and track all CAT schedules for your department. 
              You can view test details, student performance analytics, and coordinate with faculty for smooth conduct of examinations.
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
                placeholder="Test name, subject, faculty..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <GraduationCap className="w-4 h-4" />
                Course
              </label>
              <select
                className={styles.select}
                value={course}
                onChange={e => setCourse(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <BookOpen className="w-4 h-4" />
                Subject
              </label>
              <select
                className={styles.select}
                value={subject}
                onChange={e => setSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
                {subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
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
                onChange={e => setStatus((e.target.value as CatStatus) || "")}
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
                Test Type
              </label>
              <select
                className={styles.select}
                value={testType}
                onChange={e => setTestType((e.target.value as TestType) || "")}
              >
                <option value="">All Types</option>
                {testTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
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
          </div>
        </div>

        {/* CAT Cards */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <ClipboardList className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Tests Found</h3>
            <p className={styles.emptyText}>
              No continuous assessment tests match your current filter criteria.
            </p>
          </div>
        ) : (
          <div className={styles.catGrid}>
            {filtered.map((cat) => {
              const isExpanded = expandedCard === cat.id;
              const completionRate = cat.totalStudents > 0 ? 
                Math.round((cat.completedStudents / cat.totalStudents) * 100) : 0;
              const registrationRate = cat.totalStudents > 0 ? 
                Math.round((cat.registeredStudents / cat.totalStudents) * 100) : 0;
              
              return (
                <div key={cat.id} className={styles.catCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.testInfo}>
                      <h3 className={styles.testTitle}>
                        <FileText className="w-5 h-5" />
                        {cat.testName} - {cat.subject}
                      </h3>
                      <div className={styles.testMeta}>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{cat.faculty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>{cat.course} • Semester {cat.semester}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{cat.venue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(cat.status)}`}>
                        {cat.status === "Scheduled" && <Calendar className="w-4 h-4" />}
                        {cat.status === "In Progress" && <Activity className="w-4 h-4" />}
                        {cat.status === "Completed" && <CheckCircle className="w-4 h-4" />}
                        {cat.status === "Cancelled" && <XCircle className="w-4 h-4" />}
                        {cat.status === "Postponed" && <Clock className="w-4 h-4" />}
                        {cat.status === "Under Review" && <Eye className="w-4 h-4" />}
                        {cat.status}
                      </span>
                      <span className={`${styles.tag} ${getDifficultyColor(cat.difficulty)}`}>
                        {cat.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Test Details Grid */}
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Calendar className="w-4 h-4" />
                        Schedule
                      </div>
                      <div className={styles.detailValue}>
                        <div className="font-medium">
                          {new Date(cat.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {cat.startTime} - {cat.endTime} ({cat.duration} min)
                        </div>
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Target className="w-4 h-4" />
                        Marks
                      </div>
                      <div className={styles.detailValue}>
                        <div className="font-medium">Max: {cat.maxMarks}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Pass: {cat.passingMarks}
                        </div>
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Users className="w-4 h-4" />
                        Students
                      </div>
                      <div className={styles.detailValue}>
                        <div className="font-medium">{cat.registeredStudents}/{cat.totalStudents}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Registered
                        </div>
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <div className={styles.detailLabel}>
                        <Activity className="w-4 h-4" />
                        Progress
                      </div>
                      <div className={styles.detailValue}>
                        <div className="font-medium">{cat.completedStudents} completed</div>
                        {cat.status === "In Progress" && (
                          <div className="text-sm text-amber-600 dark:text-amber-400">
                            {completionRate}% done
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Registration Progress */}
                  {cat.status === "Scheduled" || cat.status === "In Progress" ? (
                    <div className={styles.progressContainer}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Registration: {cat.registeredStudents}/{cat.totalStudents}</span>
                        <span>{registrationRate}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={`${styles.progressFill} ${getProgressColor(registrationRate)}`}
                          style={{ width: `${registrationRate}%` }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* Completion Progress */}
                  {cat.status === "In Progress" && (
                    <div className={styles.progressContainer}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Completion: {cat.completedStudents}/{cat.registeredStudents}</span>
                        <span>{completionRate}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={`${styles.progressFill} ${getProgressColor(completionRate)}`}
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Performance Stats */}
                  {cat.status === "Completed" && cat.averageScore && (
                    <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                      <h4 className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                        Performance Summary
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-emerald-700 dark:text-emerald-300">
                            {cat.averageScore.toFixed(1)}%
                          </div>
                          <div className="text-emerald-600 dark:text-emerald-400">Average</div>
                        </div>
                        <div>
                          <div className="font-medium text-emerald-700 dark:text-emerald-300">
                            {cat.highestScore}%
                          </div>
                          <div className="text-emerald-600 dark:text-emerald-400">Highest</div>
                        </div>
                        <div>
                          <div className="font-medium text-emerald-700 dark:text-emerald-300">
                            {cat.lowestScore}%
                          </div>
                          <div className="text-emerald-600 dark:text-emerald-400">Lowest</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Instructions Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Instructions
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {cat.instructions}
                    </p>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <>
                      {/* Syllabus Coverage */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Syllabus Coverage
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cat.syllabus.map((topic, idx) => (
                            <span key={idx} className={`${styles.tag} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300`}>
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Test Configuration
                          </h4>
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <div>Online: {cat.isOnline ? 'Yes' : 'No'}</div>
                            {cat.platform && <div>Platform: {cat.platform}</div>}
                            <div>Proctor: {cat.proctor}</div>
                            <div>Academic Year: {cat.academicYear}</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Management
                          </h4>
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <div>Created: {new Date(cat.createdDate).toLocaleDateString()}</div>
                            <div>Modified: {new Date(cat.lastModified).toLocaleDateString()}</div>
                            <div>Created by: {cat.createdBy}</div>
                          </div>
                        </div>
                      </div>

                      {/* Documents */}
                      {(cat.questionPaper || cat.answerKey || cat.results) && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Documents
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {cat.questionPaper && (
                              <button className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 text-sm">
                                <FileText className="w-4 h-4" />
                                Question Paper
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </button>
                            )}
                            {cat.answerKey && (
                              <button className="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-sm">
                                <CheckCircle className="w-4 h-4" />
                                Answer Key
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </button>
                            )}
                            {cat.results && (
                              <button className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 text-sm">
                                <BarChart3 className="w-4 h-4" />
                                Results
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Special Instructions */}
                      {cat.specialInstructions && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            Special Instructions
                          </h4>
                          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            {cat.specialInstructions}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {/* <button
                      onClick={() => setExpandedCard(isExpanded ? null : cat.id)}
                      className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                    >
                      <Eye className="w-4 h-4" />
                      {isExpanded ? 'Show Less' : 'View Details'}
                    </button>

                    {cat.status === "Scheduled" && (
                      <button className={`${styles.button} ${styles.buttonPrimary} flex-1`}>
                        <Settings className="w-4 h-4" />
                        Monitor Test
                      </button>
                    )} */}

                    {/* {cat.status === "Completed" && (
                      <button className={`${styles.button} ${styles.buttonSuccess} flex-1`}>
                        <BarChart3 className="w-4 h-4" />
                        View Results
                      </button>
                    )}

                    {cat.status === "In Progress" && (
                      <button className={`${styles.button} ${styles.buttonWarning} flex-1`}>
                        <Activity className="w-4 h-4" />
                        Live Monitor
                      </button>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
