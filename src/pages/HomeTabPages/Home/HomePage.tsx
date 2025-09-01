import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Shield,
  Building,
  BookOpen,
  School,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Calendar,
  Bell,
  DollarSign,
  Award,
  Clock,
  UserCheck,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  LayoutDashboard,
  Globe,
  Zap,
  Star,
  CreditCard,
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


const dashboardCards = [
  {
    title: "Total Students",
    count: "1,156",
    change: "+12%",
    trend: "up",
    description: "Active enrolled students",
    icon: Users,
    color: "bg-gradient-to-r from-primary-500 to-primary-600",
    path: "/home/users",
  },
  {
    title: "Faculty Members",
    count: "78",
    change: "+3%",
    trend: "up",
    description: "Teaching staff",
    icon: UserCheck,
    color: "bg-gradient-to-r from-secondary-500 to-secondary-600",
    path: "/home/users",
  },
  {
    title: "System Roles",
    count: "8",
    change: "0%",
    trend: "stable",
    description: "Access control roles",
    icon: Shield,
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    path: "/home/roles",
  },
  {
    title: "Departments",
    count: "12",
    change: "+1",
    trend: "up",
    description: "Academic departments",
    icon: Building,
    color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    path: "/home/departments",
  },
  {
    title: "Active Courses",
    count: "245",
    change: "+18",
    trend: "up",
    description: "Running this semester",
    icon: BookOpen,
    color: "bg-gradient-to-r from-accent-500 to-accent-600",
    path: "/home/courses",
  },
  {
    title: "Programs",
    count: "18",
    change: "+2",
    trend: "up",
    description: "Degree programs",
    icon: GraduationCap,
    color: "bg-gradient-to-r from-pink-500 to-pink-600",
    path: "/home/programs",
  },
  {
    title: "Campus Locations",
    count: "3",
    change: "0%",
    trend: "stable",
    description: "Institution branches",
    icon: School,
    color: "bg-gradient-to-r from-secondary-600 to-secondary-700",
    path: "/home/institutions",
  },
  {
    title: "Fee Collection",
    count: "₹2.4Cr",
    change: "+15%",
    trend: "up",
    description: "This semester",
    icon: CreditCard,
    color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    path: "/finance/fees",
  },
];

// Mock data for charts
const attendanceData = [
  { month: "Jan", attendance: 85, target: 90 },
  { month: "Feb", attendance: 88, target: 90 },
  { month: "Mar", attendance: 92, target: 90 },
  { month: "Apr", attendance: 89, target: 90 },
  { month: "May", attendance: 91, target: 90 },
  { month: "Jun", attendance: 87, target: 90 },
];

const admissionTrends = [
  { year: "2020", admissions: 280, applications: 450 },
  { year: "2021", admissions: 320, applications: 520 },
  { year: "2022", admissions: 350, applications: 580 },
  { year: "2023", admissions: 380, applications: 640 },
  { year: "2024", admissions: 420, applications: 720 },
];

const departmentDistribution = [
  { name: "Computer Science", students: 380, color: "#3b82f6" },
  { name: "Electrical Engg", students: 245, color: "#14b8a6" },
  { name: "Mechanical Engg", students: 220, color: "#f97316" },
  { name: "Information Tech", students: 180, color: "#8b5cf6" },
  { name: "Civil Engineering", students: 131, color: "#ef4444" },
];

const feeCollectionData = [
  { month: "Aug", collected: 45, pending: 15, overdue: 5 },
  { month: "Sep", collected: 78, pending: 12, overdue: 8 },
  { month: "Oct", collected: 85, pending: 10, overdue: 3 },
  { month: "Nov", collected: 92, pending: 8, overdue: 2 },
  { month: "Dec", collected: 88, pending: 9, overdue: 4 },
  { month: "Jan", collected: 95, pending: 5, overdue: 2 },
];

const examPerformance = [
  { semester: "Sem 1", passRate: 92, avgScore: 78 },
  { semester: "Sem 2", passRate: 89, avgScore: 75 },
  { semester: "Sem 3", passRate: 94, avgScore: 82 },
  { semester: "Sem 4", passRate: 91, avgScore: 79 },
  { semester: "Sem 5", passRate: 96, avgScore: 85 },
];

const quickStats = [
  {
    label: "Today's Attendance",
    value: "89%",
    trend: "up",
    color: "text-secondary-600 dark:text-secondary-400",
  },
  {
    label: "Pending Applications",
    value: "23",
    trend: "down",
    color: "text-accent-600 dark:text-accent-400",
  },
  {
    label: "Active Exams",
    value: "12",
    trend: "stable",
    color: "text-primary-600 dark:text-primary-400",
  },
  {
    label: "Library Books Issued",
    value: "1,245",
    trend: "up",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    label: "Fee Defaulters",
    value: "45",
    trend: "down",
    color: "text-red-600 dark:text-red-400",
  },
  {
    label: "Placement Offers",
    value: "156",
    trend: "up",
    color: "text-emerald-600 dark:text-emerald-400",
  },
];

const recentActivities = [
  {
    type: "user",
    message: 'New student "Priya Sharma" enrolled in CSE',
    time: "2 min ago",
    color: "bg-secondary-500",
  },
  {
    type: "course",
    message: "Advanced Machine Learning course updated",
    time: "15 min ago",
    color: "bg-primary-500",
  },
  {
    type: "exam",
    message: "Mid-term results published for EE Dept",
    time: "1 hour ago",
    color: "bg-purple-500",
  },
  {
    type: "fee",
    message: "Fee payment reminder sent to 45 students",
    time: "2 hours ago",
    color: "bg-accent-500",
  },
  {
    type: "placement",
    message: "Google campus placement drive scheduled",
    time: "3 hours ago",
    color: "bg-emerald-500",
  },
];

const upcomingEvents = [
  {
    title: "Annual Tech Fest",
    date: "Sep 15, 2025",
    type: "Event",
    status: "confirmed",
  },
  {
    title: "Mid-term Examinations",
    date: "Sep 20, 2025",
    type: "Exam",
    status: "scheduled",
  },
  {
    title: "Faculty Development Program",
    date: "Sep 25, 2025",
    type: "Training",
    status: "planning",
  },
  {
    title: "Industry Expert Lecture",
    date: "Oct 2, 2025",
    type: "Lecture",
    status: "confirmed",
  },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return (
        <TrendingUp className="h-4 w-4 text-secondary-500 dark:text-secondary-400" />
      );
    if (trend === "down")
      return (
        <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
      );
    return <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="space-y-8 p-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-600 dark:from-primary-700 dark:via-purple-700 dark:to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 font-sans">
                AI-Powered Campus Dashboard
              </h1>
              <p className="text-primary-100 dark:text-primary-200 text-lg">
                India's Most Advanced Educational ERP System
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Multi-Campus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium">Real-time Analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span className="font-medium">AI-Enhanced</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="mb-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                <LayoutDashboard className="h-5 w-5" />
              </button>
              <div className="text-2xl font-mono font-bold">
                {currentTime.toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour12: true,
                })}
              </div>
              <div className="text-primary-200 dark:text-primary-300">
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

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg dark:shadow-gray-900/20 rounded-xl hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex-shrink-0 ${card.color} rounded-xl p-4 shadow-lg`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(card.trend)}
                      <span
                        className={`text-sm font-medium ${
                          card.trend === "up"
                            ? "text-secondary-600 dark:text-secondary-400"
                            : card.trend === "down"
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
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
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attendance Trends */}
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Activity className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                Attendance Trends
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="h-4 w-4 text-secondary-500 dark:text-secondary-400" />
                <span>90% Target</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDarkMode ? "#374151" : "#f0f0f0"}
                />
                <XAxis
                  dataKey="month"
                  stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                />
                <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                    border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    color: isDarkMode ? "#f9fafb" : "#111827",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                  name="Actual Attendance (%)"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  name="Target (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Department Distribution */}
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <PieChart className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" />
                Student Distribution
              </h2>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="students"
                  isAnimationActive={false} // disable animation
                  label={({ percent }) =>
                    ` ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {departmentDistribution.map((entry, index) => (
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

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    color: isDarkMode ? "#f9fafb" : "#111827",
                    fontSize: "0.9rem",
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial and Academic Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fee Collection Analysis */}
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-secondary-600 dark:text-secondary-400" />
                Fee Collection Analysis
              </h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Monthly breakdown (%)
              </span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={feeCollectionData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDarkMode ? "#374151" : "#f0f0f0"}
                />
                <XAxis
                  dataKey="month"
                  stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                />
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
                <Area
                  type="monotone"
                  dataKey="collected"
                  stackId="1"
                  stroke="#14b8a6"
                  fill="#14b8a6"
                  fillOpacity={0.8}
                  name="Collected"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stackId="1"
                  stroke="#f97316"
                  fill="#f97316"
                  fillOpacity={0.6}
                  name="Pending"
                />
                <Area
                  type="monotone"
                  dataKey="overdue"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.4}
                  name="Overdue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Exam Performance */}
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Award className="h-6 w-6 mr-2 text-accent-600 dark:text-accent-400" />
                Academic Performance
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={examPerformance}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDarkMode ? "#374151" : "#f0f0f0"}
                />
                <XAxis
                  dataKey="semester"
                  stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                />
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
                <Bar
                  dataKey="passRate"
                  fill="#3b82f6"
                  name="Pass Rate (%)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="avgScore"
                  fill="#14b8a6"
                  name="Average Score"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Admission Trends */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
              Admission Trends & Growth Analysis
            </h2>
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Admissions
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Applications
                </span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={admissionTrends}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#f0f0f0"}
              />
              <XAxis
                dataKey="year"
                stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
              />
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
              <Area
                type="monotone"
                dataKey="applications"
                stroke="#14b8a6"
                fill="#14b8a6"
                fillOpacity={0.3}
                name="Total Applications"
              />
              <Area
                type="monotone"
                dataKey="admissions"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.8}
                name="Confirmed Admissions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl p-6 border-l-4 border-primary-500 dark:border-primary-400 border border-gray-200 dark:border-gray-700"
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
                <div className="flex items-center space-x-1">
                  {getTrendIcon(stat.trend)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                Recent Activities
              </h2>
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium transition-colors">
                View All
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div
                      className={`w-3 h-3 ${activity.color} rounded-full flex-shrink-0`}
                    ></div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                        {activity.message}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" />
                Upcoming Events
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-500 dark:border-purple-400 pl-4 py-2"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {event.date}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === "confirmed"
                            ? "bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200"
                            : event.status === "scheduled"
                            ? "bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                            : "bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200"
                        }`}
                      >
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

        {/* Additional Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Library Analytics */}
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                Library Analytics
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Books Issued Today
                </span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  156
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Overdue Books
                </span>
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  23
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  New Acquisitions
                </span>
                <span className="text-lg font-bold text-secondary-600 dark:text-secondary-400">
                  45
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Digital Resources
                </span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  2,340
                </span>
              </div>
            </div>
          </div>

          {/* Notifications & Alerts */}
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Bell className="h-6 w-6 mr-2 text-red-600 dark:text-red-400" />
                System Alerts
              </h2>
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                3 Active
              </span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">
                      High Fee Defaulters
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      45 students have overdue payments for over 30 days
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-accent-50 dark:bg-accent-900/20 rounded-lg border border-accent-200 dark:border-accent-800">
                  <Clock className="h-5 w-5 text-accent-500 dark:text-accent-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent-800 dark:text-accent-300">
                      Exam Schedule Conflict
                    </p>
                    <p className="text-xs text-accent-600 dark:text-accent-400 mt-1">
                      CSE301 and CSE302 scheduled simultaneously
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                  <CheckCircle className="h-5 w-5 text-primary-500 dark:text-primary-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary-800 dark:text-primary-300">
                      System Maintenance
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                      Scheduled for Sep 5, 2025 at 2:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics Footer */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-secondary-600 dark:text-secondary-400" />
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                98.5%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Student Satisfaction
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "98.5%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 dark:bg-secondary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                94.2%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pass Percentage
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-secondary-600 dark:bg-secondary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "94.2%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                87%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Placement Rate
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "87%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-accent-100 dark:bg-accent-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                4.6/5
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Faculty Rating
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-accent-600 dark:bg-accent-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Users, Shield, Building, BookOpen, School, GraduationCap } from 'lucide-react';

// const dashboardCards = [
//   {
//     title: 'Users',
//     count: '1,234',
//     description: 'Total active users',
//     icon: Users,
//     color: 'bg-blue-500',
//     path: '/home/users'
//   },
//   {
//     title: 'Roles',
//     count: '8',
//     description: 'System roles',
//     icon: Shield,
//     color: 'bg-green-500',
//     path: '/home/roles'
//   },
//   {
//     title: 'Departments',
//     count: '12',
//     description: 'Academic departments',
//     icon: Building,
//     color: 'bg-purple-500',
//     path: '/home/departments'
//   },
//   {
//     title: 'Courses',
//     count: '245',
//     description: 'Active courses',
//     icon: BookOpen,
//     color: 'bg-orange-500',
//     path: '/home/courses'
//   },
//   {
//     title: 'Programs',
//     count: '18',
//     description: 'Academic programs',
//     icon: GraduationCap,
//     color: 'bg-indigo-500',
//     path: '/home/programs'
//   },
//   {
//     title: 'Institutions',
//     count: '3',
//     description: 'Campus locations',
//     icon: School,
//     color: 'bg-pink-500',
//     path: '/home/institutions'
//   }
// ];

// export const HomePage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 mt-1">Welcome to the AI Powered Campus Automation System</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {dashboardCards.map((card) => {
//           const Icon = card.icon;
//           return (
//             <div
//               key={card.title}
//               onClick={() => navigate(card.path)}
//               className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
//             >
//               <div className="p-6">
//                 <div className="flex items-center">
//                   <div className={`flex-shrink-0 ${card.color} rounded-lg p-3`}>
//                     <Icon className="h-6 w-6 text-white" />
//                   </div>
//                   <div className="ml-4 w-0 flex-1">
//                     <dl>
//                       <dt className="text-sm font-medium text-gray-500 truncate">
//                         {card.title}
//                       </dt>
//                       <dd className="text-lg font-medium text-gray-900">
//                         {card.count}
//                       </dd>
//                     </dl>
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-500">{card.description}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white shadow-sm rounded-lg">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-sm text-gray-600">New user "John Doe" registered</span>
//                 <span className="text-xs text-gray-400">2 minutes ago</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 <span className="text-sm text-gray-600">Course "Data Structures" updated</span>
//                 <span className="text-xs text-gray-400">15 minutes ago</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                 <span className="text-sm text-gray-600">New program added to CSE department</span>
//                 <span className="text-xs text-gray-400">1 hour ago</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                 <span className="text-sm text-gray-600">Department meeting scheduled</span>
//                 <span className="text-xs text-gray-400">2 hours ago</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white shadow-sm rounded-lg">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">Quick Stats</h2>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Active Students</span>
//                 <span className="text-sm font-medium text-gray-900">1,156</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Faculty Members</span>
//                 <span className="text-sm font-medium text-gray-900">78</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Running Courses</span>
//                 <span className="text-sm font-medium text-gray-900">245</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Pending Applications</span>
//                 <span className="text-sm font-medium text-orange-600">23</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
