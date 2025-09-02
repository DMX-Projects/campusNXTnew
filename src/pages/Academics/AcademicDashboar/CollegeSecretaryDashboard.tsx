 import { useState, useEffect } from "react";
import {
  BarChart3,
  GraduationCap,
  Mail,
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
  Settings,
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
  ChevronRight
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


// Academic dashboard cards with enhanced functionality
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
    title: "Inbox Messages",
    count: "23",
    change: "+8",
    trend: "up",
    description: "Unread messages",
    icon: Mail,
    color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    path: "/academics/inbox",
    urgent: true,
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

// Mock data for academic charts
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
  {
    label: "Classes Today",
    value: "24",
    trend: "stable",
    color: "text-blue-600 dark:text-blue-400",
    icon: Calendar,
  },
  {
    label: "Faculty on Leave",
    value: "3",
    trend: "down",
    color: "text-red-600 dark:text-red-400",
    icon: UserMinus,
  },
  {
    label: "Exams Pending",
    value: "8",
    trend: "down",
    color: "text-orange-600 dark:text-orange-400",
    icon: FileText,
  },
  {
    label: "New Applications",
    value: "156",
    trend: "up",
    color: "text-green-600 dark:text-green-400",
    icon: UserCheck,
  },
  {
    label: "Online Sessions",
    value: "18",
    trend: "up",
    color: "text-purple-600 dark:text-purple-400",
    icon: Video,
  },
  {
    label: "Research Papers",
    value: "42",
    trend: "up",
    color: "text-emerald-600 dark:text-emerald-400",
    icon: Award,
  },
];

const recentAcademicActivities = [
  {
    type: "class",
    message: "Dr. Smith scheduled AI & ML lecture for CSE-4A",
    time: "5 min ago",
    color: "bg-blue-500",
    priority: "normal",
  },
  {
    type: "exam",
    message: "Mid-term results published for Database Systems",
    time: "20 min ago",
    color: "bg-green-500",
    priority: "high",
  },
  {
    type: "assignment",
    message: "New assignment uploaded for Software Engineering",
    time: "45 min ago",
    color: "bg-purple-500",
    priority: "normal",
  },
  {
    type: "approval",
    message: "Leave application approved for 3 students",
    time: "1 hour ago",
    color: "bg-orange-500",
    priority: "normal",
  },
  {
    type: "material",
    message: "Study material updated for Computer Networks",
    time: "2 hours ago",
    color: "bg-cyan-500",
    priority: "low",
  },
  {
    type: "ticket",
    message: "Technical issue reported in Lab-B",
    time: "3 hours ago",
    color: "bg-red-500",
    priority: "urgent",
  },
];

const upcomingAcademicEvents = [
  {
    title: "Faculty Development Workshop",
    date: "Sep 10, 2025",
    time: "09:00 AM",
    type: "Training",
    status: "confirmed",
    department: "All Departments",
    attendees: 78,
  },
  {
    title: "Mid-term Examinations",
    date: "Sep 18, 2025",
    time: "10:00 AM",
    type: "Exam",
    status: "scheduled",
    department: "All Departments",
    attendees: 1156,
  },
  {
    title: "Research Paper Submission",
    date: "Sep 25, 2025",
    time: "11:59 PM",
    type: "Deadline",
    status: "planning",
    department: "CSE, ECE",
    attendees: 45,
  },
  {
    title: "Industry Expert Session",
    date: "Oct 5, 2025",
    time: "02:00 PM",
    type: "Seminar",
    status: "confirmed",
    department: "CSE",
    attendees: 380,
  },
];

const notifications = [
  {
    id: 1,
    type: "urgent",
    title: "High Attendance Drop",
    message: "ECE department attendance dropped below 90%",
    time: "10 min ago",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "Syllabus Update",
    message: "Machine Learning curriculum updated",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "Project Submissions",
    message: "89 projects submitted successfully",
    time: "2 hours ago",
    read: true,
  },
];

export default function AcademicDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("thisMonth");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTrendIcon = (trend) => {
    if (trend === "up")
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleCardClick = (path) => {
    console.log(`Navigate to: ${path}`);
    // In a real app, you'd use navigation here
  };

  const handleExpandCard = (cardTitle) => {
    setExpandedCard(expandedCard === cardTitle ? null : cardTitle);
  };

  const filteredActivities = recentAcademicActivities.filter(activity =>
    activity.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="space-y-8 p-6">
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 font-sans">
                Academic Management Hub
              </h1>
              <p className="text-blue-100 dark:text-blue-200 text-sm sm:text-base md:text-lg">
                Chairperson Dashboard - Advanced Academic Analytics
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium text-sm sm:text-base">Multi-Department</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium text-sm sm:text-base">Real-time Tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span className="font-medium text-sm sm:text-base">AI-Powered Insights</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-start md:items-end">
              <div className="flex space-x-2 mb-4">
                <button 
                  onClick={handleRefresh}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors relative"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {notifications.map(notification => (
                          <div key={notification.id} className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'urgent' ? 'bg-red-500' :
                                notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {notification.title}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  {notification.message}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                  {notification.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                  <LayoutDashboard className="h-5 w-5" />
                </button>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-mono font-bold">
                {currentTime.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true })}
              </div>
              <div className="text-blue-200 dark:text-blue-300 text-sm sm:text-base">
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search activities, events, or data..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Departments</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="ME">Mechanical</option>
                <option value="CE">Civil</option>
                <option value="IT">Information Technology</option>
                <option value="EE">Electrical</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Quick Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Academic Cards with Interactive Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {academicCards.map((card) => {
            const Icon = card.icon;
            const isExpanded = expandedCard === card.title;
            return (
              <div
                key={card.title}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg dark:shadow-gray-900/20 rounded-xl hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group relative"
              >
                {card.urgent && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`flex-shrink-0 ${card.color} rounded-xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(card.trend)}
                      <span className={`text-sm font-medium ${
                        card.trend === "up" ? "text-green-600" : 
                        card.trend === "down" ? "text-red-600" : "text-gray-600"
                      }`}>
                        {card.change}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {card.count}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {card.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${card.color.replace('bg-gradient-to-r', 'bg-gradient-to-r')} rounded-full transition-all duration-1000`}
                        style={{ width: card.trend === 'up' ? '75%' : card.trend === 'down' ? '45%' : '60%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card.path);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandCard(card.title);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advanced Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Department Attendance */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                Department Attendance Analytics
              </h2>
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="thisSemester">This Semester</option>
                </select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#f0f0f0"} />
                <XAxis dataKey="department" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                    border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    color: isDarkMode ? "#f9fafb" : "#111827",
                  }}
                />
                <Legend />
                <Bar dataKey="attendance" fill="#3b82f6" name="Actual %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#ef4444" name="Target %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Additional Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {attendanceAnalytics.reduce((acc, dept) => acc + dept.faculty, 0)}
                </div>
                <div className="text-xs text-gray-500">Total Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {attendanceAnalytics.reduce((acc, dept) => acc + dept.students, 0)}
                </div>
                <div className="text-xs text-gray-500">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(attendanceAnalytics.reduce((acc, dept) => acc + dept.attendance, 0) / attendanceAnalytics.length)}%
                </div>
                <div className="text-xs text-gray-500">Avg Attendance</div>
              </div>
            </div>
          </div>

          {/* Enhanced Faculty Performance */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
                Faculty Performance Trends
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Rating</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Courses</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={facultyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#f0f0f0"} />
                <XAxis dataKey="month" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                    border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    color: isDarkMode ? "#f9fafb" : "#111827",
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#14b8a6" 
                  strokeWidth={3}
                  dot={{ fill: "#14b8a6", strokeWidth: 2, r: 6 }}
                  name="Average Rating"
                />
                <Line 
                  type="monotone" 
                  dataKey="courses" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                  name="Courses Handled"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Exam Distribution and Syllabus Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Exam Type Distribution */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <PieChart className="h-6 w-6 mr-2 text-purple-600" />
                Assessment Distribution
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Total: {examDistribution.reduce((acc, exam) => acc + exam.count, 0)}</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={examDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {examDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                    border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    color: isDarkMode ? "#f9fafb" : "#111827",
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
            
            {/* Exam Stats */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {examDistribution.reduce((acc, exam) => acc + exam.count, 0)}
                </div>
                <div className="text-xs text-gray-500">Total Assessments</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {Math.round((examDistribution.find(e => e.name === 'Assignment')?.count || 0) / examDistribution.reduce((acc, exam) => acc + exam.count, 0) * 100)}%
                </div>
                <div className="text-xs text-gray-500">Assignment Rate</div>
              </div>
            </div>
          </div>

          {/* Enhanced Syllabus Progress */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Target className="h-6 w-6 mr-2 text-orange-600" />
                Syllabus Progress Tracker
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Avg: {Math.round(syllabusProgress.reduce((acc, sub) => acc + sub.completed, 0) / syllabusProgress.length)}%
                </span>
              </div>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {syllabusProgress.map((subject, index) => (
                <div key={index} className="space-y-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {subject.subject}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {subject.faculty} • {subject.department}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {subject.completed}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        subject.completed >= 90 ? 'bg-green-500' :
                        subject.completed >= 75 ? 'bg-blue-500' :
                        subject.completed >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${subject.completed}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicQuickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-blue-500 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </p>
                    <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                    {getTrendIcon(stat.trend)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Recent Activities and Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Recent Activities */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-blue-600" />
                Recent Academic Activities
              </h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    className="pl-8 pr-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {filteredActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className={`w-3 h-3 ${activity.color} rounded-full flex-shrink-0 group-hover:scale-125 transition-transform`}></div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                        {activity.message}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.priority === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          activity.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                          activity.priority === 'normal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {activity.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {activity.time}
                      </span>
                      <MoreHorizontal className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-purple-600" />
                Upcoming Events
              </h2>
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
                Add Event
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {upcomingAcademicEvents.map((event, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-500 pl-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-purple-600 transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {event.date} • {event.time}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {event.department} • {event.attendees} attendees
                        </p>
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === "confirmed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                        event.status === "scheduled" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                        {event.status}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Performance KPIs */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
            Academic Performance KPIs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                96.5%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Overall Attendance
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "96.5%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                4.6/5
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Faculty Rating
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                87%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Syllabus Progress
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "87%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                94%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Project Success
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-orange-600 dark:bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "94%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  System Status: Online
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                Last Updated: {currentTime.toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter Data</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Action</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}