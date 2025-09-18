import React, { useMemo, useState, useCallback } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  UserCheck, 
  UserX, 
  UserMinus,
  Download,
  Search,
  MessageCircle,
  CheckCircle,
  Star,
  Plus,
  Edit,
  Save,
  X,
  CheckCircle2,
  Filter,
  RotateCcw,
  Mail,
  Phone,
  Building,
  AlertCircle,
  FileText,
  TrendingUp,
  BarChart3,
  Eye,
  ChevronDown,
  ChevronUp,
  Shield,
  BookOpen,
  Timer,
  Activity,
  Award,
  MessageSquare,
  Settings,
  Bell
} from "lucide-react";

type FacultyLite = { 
  id: string; 
  name: string; 
  department: string;
  designation: string;
  email: string;
  phone: string;
  joiningDate: string;
  subjects: string[];
  employeeId: string;
  avatar?: string;
};

type AttendanceStatus = "Present" | "Absent" | "Leave" | "Late";

type AttendanceRecord = {
  id: string;
  facultyId: string;
  date: string;
  status: AttendanceStatus;
  markedAt: string;
  markedBy: string;
//   notes?: string;
  checkInTime?: string;
  checkOutTime?: string;
  workingHours?: number;
};

type Schedule = {
  facultyId: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  class: string;
};

const HOD_DEPARTMENT = "Computer Science";
const HOD_ID = "HOD_CS";

const FACULTY_LIST: FacultyLite[] = [
  { 
    id: "FAC001", 
    name: "Dr. Ananya Sharma", 
    department: "Computer Science",
    designation: "Professor",
    email: "ananya.sharma@bestcollege.edu",
    phone: "+91-98765-43210",
    joiningDate: "2015-07-15",
    employeeId: "EMP001",
    subjects: ["Machine Learning", "Artificial Intelligence", "Deep Learning"]
  },
  { 
    id: "FAC002", 
    name: "Prof. Rahul Verma", 
    department: "Computer Science",
    designation: "Associate Professor",
    email: "rahul.verma@bestcollege.edu",
    phone: "+91-98765-40010",
    joiningDate: "2018-08-20",
    employeeId: "EMP002",
    subjects: ["Operating Systems", "Cloud Computing", "DevOps"]
  },
  { 
    id: "FAC004", 
    name: "Dr. Karthik Rao", 
    department: "Computer Science",
    designation: "Assistant Professor",
    email: "karthik.rao@bestcollege.edu",
    phone: "+91-98111-22233",
    joiningDate: "2020-01-10",
    employeeId: "EMP004",
    subjects: ["Database Systems", "Data Mining", "Big Data Analytics"]
  },
  { 
    id: "FAC005", 
    name: "Dr. Priya Menon", 
    department: "Computer Science",
    designation: "Associate Professor",
    email: "priya.menon@bestcollege.edu",
    phone: "+91-97654-32109",
    joiningDate: "2017-03-12",
    employeeId: "EMP005",
    subjects: ["Network Security", "Cryptography", "Ethical Hacking"]
  },
  { 
    id: "FAC006", 
    name: "Prof. Arjun Singh", 
    department: "Computer Science",
    designation: "Professor",
    email: "arjun.singh@bestcollege.edu",
    phone: "+91-98765-54321",
    joiningDate: "2014-01-20",
    employeeId: "EMP006",
    subjects: ["Software Engineering", "HCI", "Mobile App Development"]
  },
];

// Sample schedule data
const SCHEDULES: Schedule[] = [
  { facultyId: "FAC001", day: "Monday", startTime: "09:00", endTime: "10:30", subject: "Machine Learning", class: "CS-3A" },
  { facultyId: "FAC001", day: "Wednesday", startTime: "11:00", endTime: "12:30", subject: "AI Lab", class: "CS-3B" },
  { facultyId: "FAC002", day: "Tuesday", startTime: "10:00", endTime: "11:30", subject: "Operating Systems", class: "CS-2A" },
  { facultyId: "FAC002", day: "Thursday", startTime: "14:00", endTime: "15:30", subject: "Cloud Computing", class: "CS-4A" },
  { facultyId: "FAC004", day: "Monday", startTime: "14:00", endTime: "15:30", subject: "Database Systems", class: "CS-3A" },
  { facultyId: "FAC004", day: "Friday", startTime: "09:00", endTime: "10:30", subject: "Data Mining", class: "CS-4B" },
];

type Feedback = {
  id: string;
  studentName: string;
  studentId: string;
  studentEmail: string;
  subject: string;
  facultyId: string;
  facultyName: string;
  message: string;
  rating: number;
  category: "Teaching" | "Behavior" | "Course Content" | "Assessment" | "Interaction" | "Other";
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "New" | "Under Review" | "Acknowledged" | "Resolved" | "Escalated";
  date: string;
  semester: string;
  academicYear: string;
  response?: string;
  respondedAt?: string;
  respondedBy?: string;
  hodResponse?: string;
  hodRespondedAt?: string;
  isAnonymous: boolean;
  tags: string[];
};

const FEEDBACKS: Feedback[] = [
  {
    id: "FB001",
    studentName: "Rohit Kumar",
    studentId: "CS21U001",
    studentEmail: "rohit.cs21u001@bestcollege.edu",
    subject: "Machine Learning",
    facultyId: "FAC001",
    facultyName: "Dr. Ananya Sharma",
    message: "Excellent teaching methodology with hands-on practical sessions. Dr. Sharma explains complex ML algorithms in a very understandable manner. The lab exercises are particularly helpful in reinforcing theoretical concepts. Would appreciate more real-world case studies.",
    rating: 5,
    category: "Teaching",
    priority: "Low",
    status: "Acknowledged",
    date: "2025-09-10",
    semester: "Semester 5",
    academicYear: "2024-25",
    response: "Thank you for the positive feedback. I'll incorporate more industry case studies in upcoming classes.",
    respondedAt: "2025-09-12",
    respondedBy: "Dr. Ananya Sharma",
    isAnonymous: false,
    tags: ["practical-sessions", "case-studies", "positive"]
  },
  {
    id: "FB002",
    studentName: "Anonymous",
    studentId: "CS21U***",
    studentEmail: "anonymous@system.internal",
    subject: "Cloud Computing",
    facultyId: "FAC002",
    facultyName: "Prof. Rahul Verma",
    message: "Course content is good but needs more hands-on cloud platform experience. Theoretical concepts are well explained but practical implementation on AWS/Azure is lacking. Also, assignments are sometimes unclear in requirements.",
    rating: 3,
    category: "Course Content",
    priority: "Medium",
    status: "Under Review",
    date: "2025-09-12",
    semester: "Semester 7",
    academicYear: "2024-25",
    isAnonymous: true,
    tags: ["practical-experience", "assignments", "improvement-needed"]
  },
  {
    id: "FB003",
    studentName: "Akash Mehta",
    studentId: "CS21U003",
    studentEmail: "akash.cs21u003@bestcollege.edu",
    subject: "Database Systems",
    facultyId: "FAC004",
    facultyName: "Dr. Karthik Rao",
    message: "Very structured approach to teaching database concepts. SQL practicals are excellent and progressive. Dr. Rao is always available for doubt clearing and provides additional resources. The project assignments help in understanding real-world applications.",
    rating: 4,
    category: "Teaching",
    priority: "Low",
    status: "Resolved",
    date: "2025-09-15",
    semester: "Semester 5",
    academicYear: "2024-25",
    response: "Glad to hear the practical approach is helpful. Will continue with more complex database scenarios in advanced topics.",
    respondedAt: "2025-09-16",
    respondedBy: "Dr. Karthik Rao",
    isAnonymous: false,
    tags: ["structured-teaching", "practicals", "availability"]
  },
  {
    id: "FB004",
    studentName: "Priya Patel",
    studentId: "CS22U015",
    studentEmail: "priya.cs22u015@bestcollege.edu",
    subject: "Network Security",
    facultyId: "FAC005",
    facultyName: "Dr. Priya Menon",
    message: "The cybersecurity concepts are cutting-edge and very relevant to industry needs. However, the pace is quite fast and sometimes difficult to follow. More interactive sessions and Q&A time would be beneficial.",
    rating: 4,
    category: "Teaching",
    priority: "Medium",
    status: "New",
    date: "2025-09-16",
    semester: "Semester 6",
    academicYear: "2024-25",
    isAnonymous: false,
    tags: ["industry-relevant", "pace-concerns", "interactive-sessions"]
  },
  {
    id: "FB005",
    studentName: "Anonymous",
    studentId: "CS23U***",
    studentEmail: "anonymous@system.internal",
    subject: "Software Engineering",
    facultyId: "FAC006",
    facultyName: "Prof. Arjun Singh",
    message: "Professor Singh's industry experience really shows in his teaching. The project management and SDLC concepts are explained with real examples. However, group project coordination could be better managed with clearer guidelines.",
    rating: 4,
    category: "Course Content",
    priority: "Low",
    status: "Acknowledged",
    date: "2025-09-14",
    semester: "Semester 4",
    academicYear: "2024-25",
    response: "Thank you for the feedback. I'll provide more detailed project guidelines and checkpoints for better coordination.",
    respondedAt: "2025-09-15",
    respondedBy: "Prof. Arjun Singh",
    isAnonymous: true,
    tags: ["industry-experience", "project-management", "group-coordination"]
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
  statsGrid: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-8",
  statCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 p-4 lg:p-6",
  statIcon: "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-3 lg:mb-4 transition-transform group-hover:scale-110",
  statValue: "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1",
  statLabel: "text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium",

  // Sections
  section: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm mb-8",
  sectionHeader: "px-4 lg:px-6 py-4 lg:py-5 border-b border-gray-200 dark:border-gray-700",
  sectionTitle: "text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2",
  sectionSubtitle: "text-gray-600 dark:text-gray-400",
  sectionContent: "p-4 lg:p-6",

  // Filters
  filtersSection: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm p-4 lg:p-6 mb-6",
  filtersHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6",
  filtersTitle: "text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  filtersActions: "flex flex-wrap gap-2",
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  
  // Form elements
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  
  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonSuccess: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
  buttonDanger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
  buttonWarning: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 shadow-sm hover:shadow-md",

  // Badges
  badge: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
  badgeSuccess: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  badgeDanger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
  badgeWarning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  badgeInfo: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  badgeGray: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  badgePurple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",

  // Table
  tableContainer: "overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm",
  table: "w-full min-w-[800px] divide-y divide-gray-200 dark:divide-gray-700",
  tableHeader: "bg-gray-50 dark:bg-gray-800",
  tableHeaderCell: "px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider",
  tableBody: "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700",
  tableRow: "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
  tableCell: "px-4 lg:px-6 py-4 text-sm text-gray-900 dark:text-gray-100",
  tableCellSecondary: "px-4 lg:px-6 py-4 text-sm text-gray-600 dark:text-gray-400",

  // Avatar
  avatar: "w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0",

  // Cards
  card: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6",
  cardHeader: "flex items-start justify-between gap-4 mb-4",

  // Empty state
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Alert
  alert: "p-4 rounded-xl border mb-6",
  alertInfo: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  alertWarning: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200",
  alertSuccess: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
};

export default function HODFacultyManagement() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [facultyFilter, setFacultyFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord>>({});
//   const [notes, setNotes] = useState<Record<string, string>>({});
//   const [showNotes, setShowNotes] = useState<Record<string, boolean>>({});
  
  // Feedback filters
  const [fbFacultyId, setFbFacultyId] = useState<string>("");
  const [fbSubject, setFbSubject] = useState<string>("");
  const [fbCategory, setFbCategory] = useState<string>("");
  const [fbStatus, setFbStatus] = useState<string>("");
  const [fbPriority, setFbPriority] = useState<string>("");
  const [fbRating, setFbRating] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);

  const hodFaculty = useMemo(
    () => FACULTY_LIST.filter((f) => f.department === HOD_DEPARTMENT),
    []
  );

  const visibleFaculty = useMemo(
    () =>
      hodFaculty.filter((f) =>
        facultyFilter
          ? f.name.toLowerCase().includes(facultyFilter.toLowerCase()) ||
            f.id.toLowerCase().includes(facultyFilter.toLowerCase()) ||
            f.employeeId.toLowerCase().includes(facultyFilter.toLowerCase())
          : true
      ),
    [hodFaculty, facultyFilter]
  );

  // Get day of week for selected date
  const selectedDayOfWeek = useMemo(() => {
    const date = new Date(selectedDate);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }, [selectedDate]);

  // Get faculty schedules for selected day
  const todaySchedules = useMemo(() => {
    return SCHEDULES.filter(schedule => schedule.day === selectedDayOfWeek);
  }, [selectedDayOfWeek]);

  const attendanceKey = (facultyId: string, date: string) => `${date}:${facultyId}`;

  const markAttendance = useCallback((facultyId: string, status: AttendanceStatus) => {
    const key = attendanceKey(facultyId, selectedDate);
    const now = new Date();
    const record: AttendanceRecord = {
      id: key,
      facultyId,
      date: selectedDate,
      status,
      markedAt: now.toISOString(),
      markedBy: `HOD - ${HOD_DEPARTMENT}`,
    //   notes: notesText || notes[facultyId] || "",
      checkInTime: status === "Present" ? now.toTimeString().slice(0, 5) : undefined,
      workingHours: status === "Present" ? 8 : 0,
    };
    setAttendance(prev => ({ ...prev, [key]: record }));
    
//     // Clear notes after marking
//     if (notes[facultyId]) {
//       setNotes(prev => ({ ...prev, [facultyId]: "" }));
//       setShowNotes(prev => ({ ...prev, [facultyId]: false }));
//     }
  }, [selectedDate]);

  const bulkMarkAttendance = useCallback((status: AttendanceStatus) => {
    const message = `Mark all ${visibleFaculty.length} faculty members as ${status}?`;
    if (window.confirm(message)) {
      visibleFaculty.forEach(faculty => {
        markAttendance(faculty.id, status);
      });
    }
  }, [visibleFaculty, markAttendance]);

  const getAttendanceStats = useMemo(() => {
    const todayRecords = Object.values(attendance).filter(record => record.date === selectedDate);
    
    return {
      total: visibleFaculty.length,
      present: todayRecords.filter(r => r.status === "Present").length,
      absent: todayRecords.filter(r => r.status === "Absent").length,
      onLeave: todayRecords.filter(r => r.status === "Leave").length,
      late: todayRecords.filter(r => r.status === "Late").length,
      unmarked: visibleFaculty.length - todayRecords.length,
    };
  }, [attendance, selectedDate, visibleFaculty]);

  const getFeedbackStats = useMemo(() => {
    const deptFeedbacks = FEEDBACKS.filter(f => 
      hodFaculty.some(faculty => faculty.id === f.facultyId)
    );
    
    return {
      total: deptFeedbacks.length,
      new: deptFeedbacks.filter(f => f.status === "New").length,
      critical: deptFeedbacks.filter(f => f.priority === "Critical").length,
      high: deptFeedbacks.filter(f => f.priority === "High").length,
      avgRating: deptFeedbacks.length > 0 ? 
        (deptFeedbacks.reduce((sum, f) => sum + f.rating, 0) / deptFeedbacks.length) : 0,
      lowRating: deptFeedbacks.filter(f => f.rating <= 2).length,
    };
  }, [hodFaculty]);

  const exportAttendanceCSV = useCallback(() => {
    const headers = ["Date", "Faculty ID", "Employee ID", "Name", "Designation", "Status", "Check In", "Working Hours", "Marked At"];
    const rows = [headers];
    
    Object.values(attendance)
      .filter(record => record.date === selectedDate)
      .forEach(record => {
        const faculty = hodFaculty.find(f => f.id === record.facultyId);
        if (faculty) {
          rows.push([
            record.date,
            record.facultyId,
            faculty.employeeId,
            faculty.name,
            faculty.designation,
            record.status,
            record.checkInTime || "",
            (record.workingHours || 0).toString(),
            new Date(record.markedAt).toLocaleString(),
            // record.notes || ""
          ]);
        }
      });
    
    const csv = rows.map(r => r.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `faculty_attendance_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [attendance, selectedDate, hodFaculty]);

  const exportFeedbackCSV = useCallback(() => {
    const headers = [
      "Date", "Student", "Student ID", "Faculty", "Subject", "Category", 
      "Priority", "Rating", "Status", "Semester", "Anonymous", "Feedback", "Response", "HOD Response"
    ];
    const rows = [headers];
    
    filteredFeedbacks.forEach(fb => {
      rows.push([
        fb.date,
        fb.studentName,
        fb.studentId,
        fb.facultyName,
        fb.subject,
        fb.category,
        fb.priority,
        fb.rating.toString(),
        fb.status,
        fb.semester,
        fb.isAnonymous.toString(),
        fb.message,
        fb.response || "",
        fb.hodResponse || ""
      ]);
    });
    
    const csv = rows.map(r => r.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `faculty_feedback_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  // Feedback filtering logic
  const subjects = useMemo(() => {
    const s = new Set(FEEDBACKS.map((f) => f.subject));
    return Array.from(s).sort();
  }, []);

  const categories = ["Teaching", "Behavior", "Course Content", "Assessment", "Interaction", "Other"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["New", "Under Review", "Acknowledged", "Resolved", "Escalated"];
  const ratings = ["1", "2", "3", "4", "5"];

  const filteredFeedbacks = useMemo(() => {
    return FEEDBACKS.filter(f =>
      hodFaculty.some(faculty => faculty.id === f.facultyId)
    )
      .filter(f => (fbFacultyId ? f.facultyId === fbFacultyId : true))
      .filter(f => (fbSubject ? f.subject === fbSubject : true))
      .filter(f => (fbCategory ? f.category === fbCategory : true))
      .filter(f => (fbStatus ? f.status === fbStatus : true))
      .filter(f => (fbPriority ? f.priority === fbPriority : true))
      .filter(f => (fbRating ? f.rating === parseInt(fbRating) : true))
      .filter(f => searchTerm ? (
        f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.subject.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true)
      .sort((a, b) => {
        const priorityOrder = { "Critical": 0, "High": 1, "Medium": 2, "Low": 3 };
        const statusOrder = { "New": 0, "Under Review": 1, "Acknowledged": 2, "Resolved": 3, "Escalated": 4 };
        
        if (a.priority !== b.priority) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        if (a.status !== b.status) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [fbFacultyId, fbSubject, fbCategory, fbStatus, fbPriority, fbRating, searchTerm, hodFaculty]);

  const clearAllFilters = useCallback(() => {
    setFacultyFilter("");
    setStatusFilter("");
    setFbFacultyId("");
    setFbSubject("");
    setFbCategory("");
    setFbStatus("");
    setFbPriority("");
    setFbRating("");
    setSearchTerm("");
  }, []);

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return `${styles.badge} ${styles.badgeSuccess}`;
      case "Absent":
        return `${styles.badge} ${styles.badgeDanger}`;
      case "Leave":
        return `${styles.badge} ${styles.badgeWarning}`;
      case "Late":
        return `${styles.badge} ${styles.badgeInfo}`;
      default:
        return `${styles.badge} ${styles.badgeGray}`;
    }
  };

  const getFeedbackBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return `${styles.badge} ${styles.badgeDanger}`;
      case "High":
        return `${styles.badge} ${styles.badgeWarning}`;
      case "Medium":
        return `${styles.badge} ${styles.badgeInfo}`;
      case "Low":
        return `${styles.badge} ${styles.badgeSuccess}`;
      default:
        return `${styles.badge} ${styles.badgeGray}`;
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "Present": return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20";
      case "Absent": return "text-red-600 bg-red-50 dark:bg-red-900/20";
      case "Leave": return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
      case "Late": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const attendanceStats = getAttendanceStats;
  const feedbackStats = getFeedbackStats;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Faculty Attendance & Feedback</h2>
          <p className={styles.headerSubtitle}>
            <Shield className="w-6 h-6" />
            HOD Portal - {HOD_DEPARTMENT} Department
          </p>
          <div className={styles.headerActions}>
            <button onClick={exportAttendanceCSV} className={`${styles.button} ${styles.buttonSecondary}`}>
              <Download className="w-5 h-5" />
              Export Attendance
            </button>
            <button onClick={exportFeedbackCSV} className={`${styles.button} ${styles.buttonPrimary}`}>
              <Download className="w-5 h-5" />
              Export Feedback
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}>
              <Users className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{attendanceStats.total}</div>
            <div className={styles.statLabel}>Total Faculty</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400`}>
              <UserCheck className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{attendanceStats.present}</div>
            <div className={styles.statLabel}>Present Today</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400`}>
              <UserX className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{attendanceStats.absent}</div>
            <div className={styles.statLabel}>Absent</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{feedbackStats.new}</div>
            <div className={styles.statLabel}>New Feedback</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <Star className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{feedbackStats.avgRating.toFixed(1)}</div>
            <div className={styles.statLabel}>Avg Rating</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400`}>
              <AlertCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{feedbackStats.critical + feedbackStats.high}</div>
            <div className={styles.statLabel}>Priority Issues</div>
          </div>
        </div>

        {/* HOD Role Info Alert */}
        <div className={`${styles.alert} ${styles.alertInfo}`}>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <strong>HOD Access:</strong> You can view all faculty attendance records and student feedback for your department. Use the filters below to manage and track faculty performance effectively.
          </div>
        </div>

        {/* Faculty Attendance Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className={styles.sectionTitle}>
                  <Calendar className="w-6 h-6" />
                  Faculty Attendance Overview
                </h2>
                <p className={styles.sectionSubtitle}>
                  Monitor and track faculty attendance for {selectedDayOfWeek}, {new Date(selectedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => bulkMarkAttendance("Present")}
                  className={`${styles.button} ${styles.buttonSuccess}`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark All Present
                </button>
                <button
                  onClick={() => bulkMarkAttendance("Absent")}
                  className={`${styles.button} ${styles.buttonDanger}`}
                >
                  <UserX className="w-4 h-4" />
                  Mark All Absent
                </button>
              </div>
            </div>
          </div>
          
          <div className={styles.sectionContent}>
            {/* Attendance Filters */}
            <div className={styles.filtersSection}>
              <div className={styles.filtersHeader}>
                <h3 className={styles.filtersTitle}>
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <button onClick={clearAllFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
                  <RotateCcw className="w-4 h-4" />
                  Clear All
                </button>
              </div>
              
              <div className={styles.filtersGrid}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Calendar className="w-4 h-4" />
                    Date
                  </label>
                  <input
                    type="date"
                    className={styles.input}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Search className="w-4 h-4" />
                    Search Faculty
                  </label>
                  <input
                    type="text"
                    placeholder="Name, ID, Employee ID..."
                    className={styles.input}
                    value={facultyFilter}
                    onChange={(e) => setFacultyFilter(e.target.value)}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Activity className="w-4 h-4" />
                    Status Filter
                  </label>
                  <select
                    className={styles.select}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">On Leave</option>
                    <option value="Late">Late</option>
                    <option value="Unmarked">Not Marked</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Schedule Info for Today */}
            {todaySchedules.length > 0 && (
              <div className={`${styles.alert} ${styles.alertInfo} mb-6`}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <strong>Today's Schedule ({selectedDayOfWeek}):</strong>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                  {todaySchedules.map((schedule, idx) => {
                    const faculty = hodFaculty.find(f => f.id === schedule.facultyId);
                    return (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <BookOpen className="w-4 h-4" />
                        <span>{faculty?.name} - {schedule.subject} ({schedule.startTime}-{schedule.endTime})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Attendance Table */}
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Faculty Details</th>
                    <th className={styles.tableHeaderCell}>Department Info</th>
                    <th className={styles.tableHeaderCell}>Contact</th>
                    <th className={styles.tableHeaderCell}>Today's Schedule</th>
                    <th className={styles.tableHeaderCell}>Status</th>
                    <th className={styles.tableHeaderCell}>Timing</th>
                    {/* <th className={styles.tableHeaderCell}>Notes</th> */}
                    <th className={styles.tableHeaderCell}>Actions</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {visibleFaculty
                    .filter(faculty => {
                      if (!statusFilter) return true;
                      const record = attendance[attendanceKey(faculty.id, selectedDate)];
                      if (statusFilter === "Unmarked") return !record;
                      return record?.status === statusFilter;
                    })
                    .map((faculty) => {
                      const attendanceRecord = attendance[attendanceKey(faculty.id, selectedDate)];
                      const currentStatus = attendanceRecord?.status;
                      const todaySchedule = todaySchedules.find(s => s.facultyId === faculty.id);
                      
                      return (
                        <tr key={faculty.id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            <div className="flex items-center gap-3">
                              <div className={`${styles.avatar} bg-gradient-to-br from-indigo-400 to-purple-500`}>
                                {faculty.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                  {faculty.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {faculty.id} • {faculty.employeeId}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className={styles.tableCellSecondary}>
                            <div>
                              <div className="font-medium">{faculty.designation}</div>
                              <div className="text-xs text-gray-400">
                                Since {new Date(faculty.joiningDate).getFullYear()}
                              </div>
                              <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                                {faculty.subjects.slice(0, 2).join(', ')}
                                {faculty.subjects.length > 2 && '...'}
                              </div>
                            </div>
                          </td>

                          <td className={styles.tableCellSecondary}>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <span className="text-xs truncate max-w-[150px]">{faculty.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span className="text-xs">{faculty.phone}</span>
                              </div>
                            </div>
                          </td>

                          <td className={styles.tableCellSecondary}>
                            {todaySchedule ? (
                              <div className="text-xs">
                                <div className="font-medium">{todaySchedule.subject}</div>
                                <div className="text-gray-500 dark:text-gray-400">
                                  {todaySchedule.startTime} - {todaySchedule.endTime}
                                </div>
                                <div className="text-indigo-600 dark:text-indigo-400">
                                  {todaySchedule.class}
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">No classes</span>
                            )}
                          </td>

                          <td className={styles.tableCell}>
                            {currentStatus ? (
                              <span className={getStatusBadge(currentStatus)}>
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  currentStatus === "Present" ? "bg-emerald-500" :
                                  currentStatus === "Late" ? "bg-blue-500" :
                                  currentStatus === "Leave" ? "bg-amber-500" :
                                  "bg-red-500"
                                }`}></div>
                                {currentStatus}
                              </span>
                            ) : (
                              <span className={`${styles.badge} ${styles.badgeGray}`}>
                                <div className="w-2 h-2 rounded-full mr-2 bg-gray-400"></div>
                                Not Marked
                              </span>
                            )}
                          </td>

                          <td className={styles.tableCellSecondary}>
                            {attendanceRecord ? (
                              <div className="space-y-1 text-xs">
                                {attendanceRecord.checkInTime && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>In: {attendanceRecord.checkInTime}</span>
                                  </div>
                                )}
                                <div className="text-gray-500 dark:text-gray-400">
                                  Marked: {new Date(attendanceRecord.markedAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">—</span>
                            )}
                          </td>

                          {/* <td className={styles.tableCellSecondary}>
                            <div className="space-y-2">
                              {attendanceRecord?.notes && (
                                <div className="text-xs p-2 rounded bg-gray-100 dark:bg-gray-800">
                                  {attendanceRecord.notes}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <input
                                  type="text"
                                  placeholder="Add note..."
                                  className="w-20 text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                  value={notes[faculty.id] || ""}
                                  onChange={(e) => setNotes(prev => ({ ...prev, [faculty.id]: e.target.value }))}
                                />
                                {notes[faculty.id] && (
                                  <button
                                    onClick={() => setNotes(prev => ({ ...prev, [faculty.id]: "" }))}
                                    className="text-xs text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div> */}
                          {/* </td> */}

                          <td className={styles.tableCell}>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => markAttendance(faculty.id, "Present")}
                                className={`p-2 rounded-lg transition-colors ${
                                  currentStatus === "Present" 
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    : "text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                                }`}
                                title="Mark Present"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => markAttendance(faculty.id, "Late")}
                                className={`p-2 rounded-lg transition-colors ${
                                  currentStatus === "Late" 
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                                }`}
                                title="Mark Late"
                              >
                                <Clock className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => markAttendance(faculty.id, "Absent")}
                                className={`p-2 rounded-lg transition-colors ${
                                  currentStatus === "Absent" 
                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                    : "text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                                }`}
                                title="Mark Absent"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => markAttendance(faculty.id, "Leave")}
                                className={`p-2 rounded-lg transition-colors ${
                                  currentStatus === "Leave" 
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                    : "text-gray-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                                }`}
                                title="Mark Leave"
                              >
                                <UserMinus className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {visibleFaculty.length === 0 && (
              <div className={styles.empty}>
                <Users className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No Faculty Members Found</h3>
                <p className={styles.emptyText}>
                  Try adjusting your search filters to find faculty members.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Student Feedback Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className={styles.sectionTitle}>
                  <MessageSquare className="w-6 h-6" />
                  Student Feedback Analysis
                </h2>
                <p className={styles.sectionSubtitle}>
                  Monitor and analyze student feedback for department faculty members
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`${styles.badge} ${styles.badgeInfo}`}>
                  {filteredFeedbacks.length} feedback(s)
                </span>
              </div>
            </div>
          </div>
          
          <div className={styles.sectionContent}>
            {/* Feedback Filters */}
            <div className={styles.filtersSection}>
              <div className={styles.filtersHeader}>
                <h3 className={styles.filtersTitle}>
                  <Filter className="w-5 h-5" />
                  Feedback Filters
                </h3>
              </div>
              
              <div className={styles.filtersGrid}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Search className="w-4 h-4" />
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Student, faculty, message..."
                    className={styles.input}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Users className="w-4 h-4" />
                    Faculty
                  </label>
                  <select
                    className={styles.select}
                    value={fbFacultyId}
                    onChange={(e) => setFbFacultyId(e.target.value)}
                  >
                    <option value="">All Faculty</option>
                    {hodFaculty.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
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
                    value={fbSubject}
                    onChange={(e) => setFbSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <FileText className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    className={styles.select}
                    value={fbCategory}
                    onChange={(e) => setFbCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <AlertCircle className="w-4 h-4" />
                    Priority
                  </label>
                  <select
                    className={styles.select}
                    value={fbPriority}
                    onChange={(e) => setFbPriority(e.target.value)}
                  >
                    <option value="">All Priority</option>
                    {priorities.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Star className="w-4 h-4" />
                    Rating
                  </label>
                  <select
                    className={styles.select}
                    value={fbRating}
                    onChange={(e) => setFbRating(e.target.value)}
                  >
                    <option value="">All Ratings</option>
                    {ratings.map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r !== "1" ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Feedback Cards */}
            <div className="space-y-6">
              {filteredFeedbacks.map((feedback) => {
                const isExpanded = expandedFeedback === feedback.id;
                
                return (
                  <div key={feedback.id} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div className="flex items-center gap-4">
                        <div className={`${styles.avatar} ${
                          feedback.isAnonymous 
                            ? "bg-gradient-to-br from-gray-400 to-gray-600" 
                            : "bg-gradient-to-br from-purple-400 to-purple-600"
                        }`}>
                          {feedback.isAnonymous ? "?" : feedback.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {feedback.studentName}
                            </h3>
                            {feedback.isAnonymous && (
                              <span className={`${styles.badge} ${styles.badgePurple}`}>
                                Anonymous
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <div>{feedback.studentId} • {feedback.semester}</div>
                            <div className="flex items-center gap-4">
                              <span><strong>Faculty:</strong> {feedback.facultyName}</span>
                              <span><strong>Subject:</strong> {feedback.subject}</span>
                              <span><strong>Category:</strong> {feedback.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className={getFeedbackBadge(feedback.priority)}>
                            {feedback.priority}
                          </span>
                          <span className={`${styles.badge} ${
                            feedback.status === "Resolved" ? styles.badgeSuccess :
                            feedback.status === "Under Review" ? styles.badgeWarning :
                            feedback.status === "New" ? styles.badgeInfo :
                            styles.badgeGray
                          }`}>
                            {feedback.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= feedback.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            {feedback.rating}/5
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          {new Date(feedback.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Feedback Content */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Student Feedback:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {feedback.message}
                      </p>
                      
                      {feedback.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {feedback.tags.map((tag) => (
                            <span key={tag} className={`${styles.badge} ${styles.badgeGray}`}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Faculty Response */}
                    {feedback.response && (
                      <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-xl mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              Faculty Response
                            </span>
                          </div>
                          <span className="text-xs text-blue-600 dark:text-blue-400">
                            {feedback.respondedAt && new Date(feedback.respondedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                          {feedback.response}
                        </p>
                        {feedback.respondedBy && (
                          <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            - {feedback.respondedBy}
                          </div>
                        )}
                      </div>
                    )}

                    {/* HOD Response */}
                    {feedback.hodResponse && (
                      <div className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-r-xl mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                              HOD Review
                            </span>
                          </div>
                          <span className="text-xs text-indigo-600 dark:text-indigo-400">
                            {feedback.hodRespondedAt && new Date(feedback.hodRespondedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                          {feedback.hodResponse}
                        </p>
                      </div>
                    )}

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Academic Year:</span>
                            <div className="text-gray-600 dark:text-gray-400">{feedback.academicYear}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Semester:</span>
                            <div className="text-gray-600 dark:text-gray-400">{feedback.semester}</div>
                          </div>
                          {!feedback.isAnonymous && (
                            <div>
                              <span className="font-medium text-gray-700 dark:text-gray-300">Student Email:</span>
                              <div className="text-gray-600 dark:text-gray-400">{feedback.studentEmail}</div>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Feedback ID:</span>
                            <div className="text-gray-600 dark:text-gray-400 font-mono">{feedback.id}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setExpandedFeedback(isExpanded ? null : feedback.id)}
                        className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                      >
                        <Eye className="w-4 h-4" />
                        {isExpanded ? 'Show Less' : 'View Details'}
                      </button>
                      
                      {/* {feedback.priority === "Critical" || feedback.priority === "High" ? (
                        <button className={`${styles.button} ${styles.buttonWarning} flex-1`}>
                          <Bell className="w-4 h-4" />
                          Requires Attention
                        </button>
                      ) : (
                        <button className={`${styles.button} ${styles.buttonPrimary} flex-1`}>
                          <MessageSquare className="w-4 h-4" />
                          Add HOD Response
                        </button>
                      )} */}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredFeedbacks.length === 0 && (
              <div className={styles.empty}>
                <MessageCircle className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No Feedback Found</h3>
                <p className={styles.emptyText}>
                  No student feedback matches your current filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}