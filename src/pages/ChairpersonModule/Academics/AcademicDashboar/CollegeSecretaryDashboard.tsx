import { useState, useEffect } from "react";
import {
  BarChart3,
  GraduationCap,
  CheckCircle,
  Calendar,
  UserMinus,
  UserCheck,
  BookOpen,
  FileText,
  FolderOpen,
  Briefcase,
  Monitor,
  Code,
  MessageSquare,
  Target,
  Video,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Bell,
  Users,
  Award,
  Star,
  Globe,
  Zap,
  LayoutDashboard,
  PieChart,
  Filter,
  Download,
  RefreshCw,
  Search,
  Plus,
  Eye,
  Edit,
  Trash,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const academicCards = [
  {
    title: "Faculty Members",
    count: "78",
    change: "+3%",
    trend: "up",
    description: "Active teaching staff",
    icon: GraduationCap,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    path: "/academics/faculty",
    urgent: false,
  },
  {
    title: "Attendance Rate",
    count: "94.2%",
    change: "+2.1%",
    trend: "up",
    description: "Current semester avg",
    icon: CheckCircle,
    color: "bg-gradient-to-r from-green-500 to-green-600",
    path: "/academics/student-attendance",
    urgent: false,
  },
  {
    title: "Active Subjects",
    count: "156",
    change: "+12",
    trend: "up",
    description: "This semester",
    icon: BookOpen,
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    path: "/academics/subjects-syllabus",
    urgent: false,
  },
  {
    title: "Pending Approvals",
    count: "18",
    change: "-5",
    trend: "down",
    description: "Student requests",
    icon: UserCheck,
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    path: "/academics/student-approval",
    urgent: true,
  },
  {
    title: "Online Tests",
    count: "34",
    change: "+6",
    trend: "up",
    description: "Scheduled this month",
    icon: Monitor,
    color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    path: "/academics/online-tests",
    urgent: false,
  },
  {
    title: "Student Projects",
    count: "89",
    change: "+15",
    trend: "up",
    description: "Active submissions",
    icon: Briefcase,
    color: "bg-gradient-to-r from-pink-500 to-pink-600",
    path: "/academics/student-projects",
    urgent: false,
  },
  {
    title: "Study Materials",
    count: "245",
    change: "+28",
    trend: "up",
    description: "Available resources",
    icon: FolderOpen,
    color: "bg-gradient-to-r from-cyan-500 to-cyan-600",
    path: "/academics/study-material",
    urgent: false,
  },
];

// Mock data (unchanged)
const attendanceAnalytics = [
  { department: "CSE", attendance: 96, target: 95, faculty: 12, students: 380 },
  { department: "ECE", attendance: 93, target: 95, faculty: 8, students: 245 },
  { department: "ME", attendance: 91, target: 95, faculty: 10, students: 220 },
  { department: "CE", attendance: 94, target: 95, faculty: 6, students: 131 },
  { department: "IT", attendance: 97, target: 95, faculty: 9, students: 180 },
  { department: "EE", attendance: 89, target: 95, faculty: 7, students: 156 },
];

const facultyPerformance = [
  { month: "Aug", rating: 4.2, courses: 24, publications: 3, workshops: 2 },
  { month: "Sep", rating: 4.5, courses: 28, publications: 5, workshops: 3 },
  { month: "Oct", rating: 4.3, courses: 26, publications: 2, workshops: 1 },
  { month: "Nov", rating: 4.6, courses: 30, publications: 4, workshops: 4 },
  { month: "Dec", rating: 4.4, courses: 27, publications: 3, workshops: 2 },
  { month: "Jan", rating: 4.7, courses: 32, publications: 6, workshops: 3 },
];

const examDistribution = [
  { name: "Mid-term", count: 45, color: "#3b82f6" },
  { name: "Quiz", count: 89, color: "#14b8a6" },
  { name: "Assignment", count: 156, color: "#f97316" },
  { name: "Project", count: 67, color: "#8b5cf6" },
  { name: "Viva", count: 34, color: "#ef4444" },
];

const syllabusProgress = [
  { subject: "Data Structures", completed: 85, total: 100, faculty: "Dr. Smith", department: "CSE" },
  { subject: "Machine Learning", completed: 78, total: 100, faculty: "Dr. Johnson", department: "CSE" },
  { subject: "Database Systems", completed: 92, total: 100, faculty: "Dr. Brown", department: "IT" },
  { subject: "Computer Networks", completed: 73, total: 100, faculty: "Dr. Davis", department: "ECE" },
  { subject: "Software Engineering", completed: 88, total: 100, faculty: "Dr. Wilson", department: "CSE" },
  { subject: "Digital Electronics", completed: 95, total: 100, faculty: "Dr. Taylor", department: "ECE" },
];

const academicQuickStats = [
  { label: "Classes Today", value: "24", trend: "stable", color: "text-blue-600", icon: Calendar },
  { label: "Faculty on Leave", value: "3", trend: "down", color: "text-red-600", icon: UserMinus },
  { label: "Exams Pending", value: "8", trend: "down", color: "text-orange-600", icon: FileText },
  { label: "New Applications", value: "156", trend: "up", color: "text-green-600", icon: UserCheck },
  { label: "Online Sessions", value: "18", trend: "up", color: "text-purple-600", icon: Video },
  { label: "Research Papers", value: "42", trend: "up", color: "text-emerald-600", icon: Award },
];

const recentAcademicActivities = [
  { type: "class", message: "Dr. Smith scheduled AI & ML lecture for CSE-4A", time: "5 min ago", color: "bg-blue-500", priority: "normal" },
  { type: "exam", message: "Mid-term results published for Database Systems", time: "20 min ago", color: "bg-green-500", priority: "high" },
  { type: "assignment", message: "New assignment uploaded for Software Engineering", time: "45 min ago", color: "bg-purple-500", priority: "normal" },
  { type: "approval", message: "Leave application approved for 3 students", time: "1 hour ago", color: "bg-orange-500", priority: "normal" },
  { type: "material", message: "Study material updated for Computer Networks", time: "2 hours ago", color: "bg-cyan-500", priority: "low" },
  { type: "ticket", message: "Technical issue reported in Lab-B", time: "3 hours ago", color: "bg-red-500", priority: "urgent" },
];

const upcomingAcademicEvents = [
  { title: "Faculty Development Workshop", date: "Sep 10, 2025", time: "09:00 AM", type: "Training", status: "confirmed", department: "All Departments", attendees: 78 },
  { title: "Mid-term Examinations", date: "Sep 18, 2025", time: "10:00 AM", type: "Exam", status: "scheduled", department: "All Departments", attendees: 1156 },
  { title: "Research Paper Submission", date: "Sep 25, 2025", time: "11:59 PM", type: "Deadline", status: "planning", department: "CSE, ECE", attendees: 45 },
  { title: "Industry Expert Session", date: "Oct 5, 2025", time: "02:00 PM", type: "Seminar", status: "confirmed", department: "CSE", attendees: 380 },
];

export default function AcademicDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("thisMonth");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTrendIcon = (trend) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const handleCardClick = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  const handleExpandCard = (cardTitle) => {
    setExpandedCard(expandedCard === cardTitle ? null : cardTitle);
  };

  const filteredActivities = recentAcademicActivities.filter((activity) =>
    activity.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="space-y-8 p-6">
        {/* --- header, filters, cards, analytics, charts, etc. --- */}
        {/* The rest of your existing JSX remains unchanged and safe to keep */}
      </div>
    </div>
  );
}
