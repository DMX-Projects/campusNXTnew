import React, { useState, useMemo, useCallback } from 'react';
import { 
  Calendar, 
  User, 
  BookOpen, 
  ClipboardList, 
  BarChart2, 
  Bell, 
  TrendingUp,
  Clock,
  Award,
  FileText,
  Eye,
  Download,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Target,
  GraduationCap,
  Users,
  Activity,
  Star,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  RefreshCw,
  Settings,
  X,
  ChevronRight,
  ChevronDown,
  Menu,
  Home,
  Calendar as CalendarIcon,
  Trophy,
  BookMarked,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Share,
  Heart,
  Bookmark,
  Edit,
  Plus,
  Minus,
  Info,
  Flag,
  Zap,
  Shield,
  Lock,
  Unlock,
  ChartBar,
  PieChart,
  LineChart,
  Grid,
  List
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  code: string;
  semester: string;
  credits: number;
  attendance: number;
  grade: string;
  instructor: string;
  totalClasses: number;
  attendedClasses: number;
  nextClass?: string;
  syllabus: {
    completed: number;
    total: number;
  };
  assignments: number;
  pendingAssignments: number;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  dueDate: string;
  submissionDate?: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  marks?: number;
  totalMarks?: number;
  priority: 'low' | 'medium' | 'high';
  description: string;
  attachments?: string[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'announcement';
  date: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'academic' | 'administrative' | 'fee' | 'exam' | 'general';
  actionRequired?: boolean;
}

interface Exam {
  id: string;
  subject: string;
  subjectCode: string;
  date: string;
  time: string;
  duration: string;
  type: 'midterm' | 'final' | 'quiz' | 'practical';
  venue: string;
  syllabus: string[];
  instructions: string[];
  maxMarks: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'extracurricular' | 'sports' | 'cultural';
  badge: string;
}

const StudentDashboard: React.FC = () => {
  // State management
  const [selectedTab, setSelectedTab] = useState<'overview' | 'courses' | 'assignments' | 'exams' | 'profile'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Student Information
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    registrationNumber: 'REG2022001',
    email: 'arjun.kumar@student.college.edu',
    phone: '+91-9876543210',
    department: 'Computer Science & Engineering',
    semester: '5th Semester',
    batch: '2022-2026',
    section: 'A',
    cgpa: 8.45,
    sgpa: 8.72,
    rank: 12,
    totalStudents: 120,
    profileImage: '/api/placeholder/150/150',
    address: 'Hostel Block A, Room 205',
    bloodGroup: 'B+',
    mentorName: 'Dr. Priya Sharma',
    parentContact: '+91-9876543209'
  });

  // Current Semester Courses
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'Data Structures and Algorithms',
      code: 'CS301',
      semester: '5',
      credits: 4,
      attendance: 92,
      grade: 'A',
      instructor: 'Dr. Rajesh Kumar',
      totalClasses: 45,
      attendedClasses: 41,
      nextClass: '2024-11-12T10:00:00Z',
      syllabus: { completed: 78, total: 100 },
      assignments: 6,
      pendingAssignments: 2
    },
    {
      id: '2',
      name: 'Database Management Systems',
      code: 'CS302',
      semester: '5',
      credits: 3,
      attendance: 88,
      grade: 'A-',
      instructor: 'Prof. Priya Sharma',
      totalClasses: 40,
      attendedClasses: 35,
      nextClass: '2024-11-12T14:00:00Z',
      syllabus: { completed: 85, total: 100 },
      assignments: 4,
      pendingAssignments: 1
    },
    {
      id: '3',
      name: 'Operating Systems',
      code: 'CS303',
      semester: '5',
      credits: 4,
      attendance: 95,
      grade: 'A+',
      instructor: 'Dr. Amit Singh',
      totalClasses: 42,
      attendedClasses: 40,
      nextClass: '2024-11-13T09:00:00Z',
      syllabus: { completed: 92, total: 100 },
      assignments: 5,
      pendingAssignments: 1
    },
    {
      id: '4',
      name: 'Computer Networks',
      code: 'CS304',
      semester: '5',
      credits: 3,
      attendance: 85,
      grade: 'B+',
      instructor: 'Dr. Neha Gupta',
      totalClasses: 38,
      attendedClasses: 32,
      nextClass: '2024-11-13T11:00:00Z',
      syllabus: { completed: 68, total: 100 },
      assignments: 4,
      pendingAssignments: 2
    },
    {
      id: '5',
      name: 'Software Engineering',
      code: 'CS305',
      semester: '5',
      credits: 3,
      attendance: 91,
      grade: 'A-',
      instructor: 'Prof. Vikram Patel',
      totalClasses: 36,
      attendedClasses: 33,
      nextClass: '2024-11-14T15:00:00Z',
      syllabus: { completed: 75, total: 100 },
      assignments: 3,
      pendingAssignments: 1
    }
  ]);

  // Enhanced Assignments
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Binary Tree Implementation and Analysis',
      subject: 'Data Structures and Algorithms',
      subjectCode: 'CS301',
      dueDate: '2024-11-15T23:59:59Z',
      status: 'pending',
      priority: 'high',
      description: 'Implement various binary tree operations including insertion, deletion, traversal, and analysis of time complexity.',
      attachments: ['assignment_guidelines.pdf']
    },
    {
      id: '2',
      title: 'Database Design Project - Library Management',
      subject: 'Database Management Systems',
      subjectCode: 'CS302',
      dueDate: '2024-11-18T23:59:59Z',
      status: 'pending',
      priority: 'medium',
      description: 'Design and implement a complete database schema for a library management system with normalization.',
      attachments: ['project_requirements.docx', 'sample_data.sql']
    },
    {
      id: '3',
      title: 'Process Scheduling Algorithm Simulation',
      subject: 'Operating Systems',
      subjectCode: 'CS303',
      dueDate: '2024-11-10T23:59:59Z',
      status: 'submitted',
      submissionDate: '2024-11-09T20:30:00Z',
      priority: 'medium',
      description: 'Simulate different CPU scheduling algorithms and compare their performance metrics.',
      attachments: ['submission.zip']
    },
    {
      id: '4',
      title: 'Socket Programming - Chat Application',
      subject: 'Computer Networks',
      subjectCode: 'CS304',
      dueDate: '2024-11-05T23:59:59Z',
      status: 'graded',
      submissionDate: '2024-11-04T18:15:00Z',
      marks: 18,
      totalMarks: 20,
      priority: 'high',
      description: 'Develop a multi-client chat application using socket programming in Python.',
      attachments: ['chat_app.py', 'documentation.pdf']
    },
    {
      id: '5',
      title: 'Software Requirements Specification',
      subject: 'Software Engineering',
      subjectCode: 'CS305',
      dueDate: '2024-11-20T23:59:59Z',
      status: 'pending',
      priority: 'low',
      description: 'Create a comprehensive SRS document for a web-based application following IEEE standards.',
      attachments: ['srs_template.docx']
    }
  ]);

  // Enhanced Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Mid-term Exam Schedule Released',
      message: 'The mid-term examination schedule for all subjects has been published. Please check your exam dates and prepare accordingly.',
      type: 'info',
      date: '2024-11-10T10:00:00Z',
      read: false,
      priority: 'high',
      category: 'exam',
      actionRequired: true
    },
    {
      id: '2',
      title: 'Assignment Submission Reminder',
      message: 'Your Data Structures assignment is due in 2 days. Please submit before the deadline to avoid penalties.',
      type: 'warning',
      date: '2024-11-10T14:30:00Z',
      read: false,
      priority: 'urgent',
      category: 'academic',
      actionRequired: true
    },
    {
      id: '3',
      title: 'Semester Fee Payment Confirmation',
      message: 'Your semester fee payment of ₹85,000 has been successfully processed. Receipt is available for download.',
      type: 'success',
      date: '2024-11-09T09:15:00Z',
      read: true,
      priority: 'medium',
      category: 'fee'
    },
    {
      id: '4',
      title: 'Low Attendance Alert - CS304',
      message: 'Your attendance in Computer Networks (CS304) is 85%, which is below the required 90%. Please attend classes regularly.',
      type: 'error',
      date: '2024-11-08T16:20:00Z',
      read: false,
      priority: 'high',
      category: 'academic',
      actionRequired: true
    },
    {
      id: '5',
      title: 'Technical Fest Registration Open',
      message: 'Registration for TechFest 2024 is now open. Participate in various technical competitions and workshops.',
      type: 'announcement',
      date: '2024-11-07T12:00:00Z',
      read: true,
      priority: 'medium',
      category: 'general'
    }
  ]);

  // Enhanced Upcoming Exams
  const [upcomingExams] = useState<Exam[]>([
    {
      id: '1',
      subject: 'Data Structures and Algorithms',
      subjectCode: 'CS301',
      date: '2024-11-20T10:00:00Z',
      time: '10:00 AM - 1:00 PM',
      duration: '3 hours',
      type: 'midterm',
      venue: 'Main Hall - Block A',
      maxMarks: 100,
      syllabus: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees', 'Graphs', 'Sorting Algorithms'],
      instructions: ['Carry your ID card', 'No electronic devices allowed', 'Blue/Black pen only']
    },
    {
      id: '2',
      subject: 'Database Management Systems',
      subjectCode: 'CS302',
      date: '2024-11-22T14:00:00Z',
      time: '2:00 PM - 4:00 PM',
      duration: '2 hours',
      type: 'midterm',
      venue: 'Lab - Block B',
      maxMarks: 75,
      syllabus: ['SQL Queries', 'Normalization', 'Transactions', 'Indexing'],
      instructions: ['Practical exam on computers', 'Database software will be provided']
    },
    {
      id: '3',
      subject: 'Operating Systems',
      subjectCode: 'CS303',
      date: '2024-11-25T09:00:00Z',
      time: '9:00 AM - 12:00 PM',
      duration: '3 hours',
      type: 'midterm',
      venue: 'Auditorium',
      maxMarks: 100,
      syllabus: ['Process Management', 'Memory Management', 'File Systems', 'Synchronization'],
      instructions: ['Carry calculator', 'Reference material not allowed']
    }
  ]);

  // Mark notification as read
  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const avgAttendance = Math.round(courses.reduce((sum, course) => sum + course.attendance, 0) / courses.length);
    const pendingAssignments = assignments.filter(a => a.status === 'pending').length;
    const overdueAssignments = assignments.filter(a => a.status === 'overdue' || (a.status === 'pending' && new Date(a.dueDate) < new Date())).length;
    const unreadNotifications = notifications.filter(n => !n.read).length;
    const urgentNotifications = notifications.filter(n => !n.read && n.priority === 'urgent').length;
    
    return {
      totalCourses: courses.length,
      totalCredits,
      avgAttendance,
      pendingAssignments,
      overdueAssignments,
      unreadNotifications,
      urgentNotifications,
      upcomingExams: upcomingExams.length,
      completedAssignments: assignments.filter(a => a.status === 'graded' || a.status === 'submitted').length
    };
  }, [courses, assignments, notifications, upcomingExams]);

  // Utility functions
  const getNotificationStyle = (type: string, priority: string) => {
    const baseStyle = "border-l-4 ";
    switch (type) {
      case 'success': return baseStyle + 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400';
      case 'warning': return baseStyle + 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-400';
      case 'error': return baseStyle + 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400';
      case 'announcement': return baseStyle + 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400';
      default: return baseStyle + 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'announcement': return <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default: return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600 dark:text-green-400';
    if (attendance >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (grade.includes('B')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    if (grade.includes('C')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  const getAssignmentStatusColor = (status: string, dueDate: string) => {
    const isOverdue = new Date(dueDate) < new Date() && status === 'pending';
    if (isOverdue) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'graded': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const days = Math.ceil((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {studentInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent">
                  Welcome, {studentInfo.name}
                </h1>
                <div className="text-gray-600 dark:text-gray-300 space-y-1">
                  <p className="flex items-center gap-2 text-sm sm:text-base">
                    <GraduationCap className="w-4 h-4" />
                    {studentInfo.rollNumber} • {studentInfo.department}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {studentInfo.semester} • Section {studentInfo.section} • Rank: {studentInfo.rank}/{studentInfo.totalStudents}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">CGPA: {studentInfo.cgpa}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Current SGPA: {studentInfo.sgpa}</div>
                  </div>
                  
                  <div className="relative">
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalCourses}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Enrolled Courses</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">{stats.totalCredits} Total Credits</div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.avgAttendance}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Attendance</div>
                <div className={`text-xs ${getAttendanceColor(stats.avgAttendance)}`}>
                  {stats.avgAttendance >= 75 ? 'Good Standing' : 'Below Minimum'}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingAssignments}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pending Assignments</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">
                  {stats.overdueAssignments > 0 ? `${stats.overdueAssignments} Overdue` : 'All on Track'}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.upcomingExams}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Exams</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">Next 30 Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm mb-8">
          <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 p-2">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
              { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'assignments', label: 'Assignments', icon: <ClipboardList className="w-4 h-4" /> },
              { id: 'exams', label: 'Exams', icon: <FileText className="w-4 h-4" /> },
              { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all rounded-lg ${
                  selectedTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Today's Schedule */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Today's Schedule
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.filter(course => course.nextClass && new Date(course.nextClass).toDateString() === new Date().toDateString()).map(course => (
                      <div key={course.id} className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-semibold text-blue-900 dark:text-blue-100">{course.name}</div>
                            <div className="text-sm text-blue-700 dark:text-blue-300">
                              {formatDateTime(course.nextClass!)} | {course.instructor}
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              Room TBA | Credits: {course.credits}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {courses.filter(course => course.nextClass && new Date(course.nextClass).toDateString() === new Date().toDateString()).length === 0 && (
                      <div className="col-span-2 p-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <p>No classes scheduled for today</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Upcoming Deadlines
                  </h3>
                  
                  <div className="space-y-3">
                    {assignments
                      .filter(a => a.status === 'pending')
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                      .slice(0, 3)
                      .map(assignment => {
                        const daysLeft = getDaysUntil(assignment.dueDate);
                        const isOverdue = daysLeft < 0;
                        const isUrgent = daysLeft <= 2;
                        
                        return (
                          <div key={assignment.id} className={`p-4 rounded-xl border transition-all ${
                            isOverdue ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                            isUrgent ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
                            'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                          }`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{assignment.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{assignment.subjectCode} • {assignment.subject}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">Due: {formatDate(assignment.dueDate)}</p>
                              </div>
                              <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  isOverdue ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                  isUrgent ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                }`}>
                                  {isOverdue ? 'Overdue' : isUrgent ? 'Urgent' : `${daysLeft} days left`}
                                </span>
                                <div className={`text-xs mt-1 ${getPriorityColor(assignment.priority)}`}>
                                  {assignment.priority} priority
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Recent Notifications */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Recent Notifications
                    </h3>
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {notifications.slice(0, 5).map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          getNotificationStyle(notification.type, notification.priority)
                        } ${!notification.read ? 'shadow-md' : 'opacity-75'}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{notification.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(notification.date)}
                                </span>
                                {notification.actionRequired && (
                                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full">
                                    Action Required
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                {notification.category}
                              </span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'courses' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Current Semester Courses
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {courses.map(course => (
                    <div key={course.id} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{course.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{course.code} • {course.credits} Credits</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">Instructor: {course.instructor}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(course.grade)}`}>
                          {course.grade}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className={`text-lg font-semibold ${getAttendanceColor(course.attendance)}`}>
                            {course.attendance}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Attendance</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {course.attendedClasses}/{course.totalClasses}
                          </div>
                        </div>
                        
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                            {course.syllabus.completed}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Syllabus</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Completed
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Assignments: </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {course.assignments - course.pendingAssignments}/{course.assignments}
                          </span>
                          {course.pendingAssignments > 0 && (
                            <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">
                              ({course.pendingAssignments} pending)
                            </span>
                          )}
                        </div>
                        
                        {course.nextClass && (
                          <div className="text-xs text-blue-600 dark:text-blue-400">
                            Next: {formatDateTime(course.nextClass)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'assignments' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Assignments
                </h3>
                
                <div className="space-y-4">
                  {assignments
                    .sort((a, b) => {
                      // Sort by status priority: pending/overdue first, then by due date
                      if (a.status === 'pending' && b.status !== 'pending') return -1;
                      if (b.status === 'pending' && a.status !== 'pending') return 1;
                      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                    })
                    .map(assignment => {
                      const daysLeft = getDaysUntil(assignment.dueDate);
                      const isOverdue = daysLeft < 0 && assignment.status === 'pending';
                      
                      return (
                        <div key={assignment.id} className={`border rounded-2xl p-6 transition-all hover:shadow-lg ${
                          isOverdue ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10' :
                          assignment.status === 'pending' ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10' :
                          'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                        }`}>
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{assignment.title}</h4>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAssignmentStatusColor(assignment.status, assignment.dueDate)}`}>
                                  {isOverdue ? 'Overdue' : assignment.status}
                                </span>
                              </div>
                              
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <span className="font-medium">{assignment.subjectCode}</span> • {assignment.subject}
                              </div>
                              
                              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                {assignment.description}
                              </p>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className={isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                                    Due: {formatDate(assignment.dueDate)}
                                    {assignment.status === 'pending' && (
                                      <span className={`ml-2 ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                        ({isOverdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`})
                                      </span>
                                    )}
                                  </span>
                                </div>
                                
                                <div className={`flex items-center gap-1 ${getPriorityColor(assignment.priority)}`}>
                                  <Flag className="w-4 h-4" />
                                  <span className="capitalize">{assignment.priority} Priority</span>
                                </div>
                                
                                {assignment.submissionDate && (
                                  <div className="text-green-600 dark:text-green-400">
                                    Submitted: {formatDate(assignment.submissionDate)}
                                  </div>
                                )}
                                
                                {assignment.marks !== undefined && (
                                  <div className="font-semibold text-green-600 dark:text-green-400">
                                    Score: {assignment.marks}/{assignment.totalMarks} ({((assignment.marks / assignment.totalMarks!) * 100).toFixed(1)}%)
                                  </div>
                                )}
                              </div>
                              
                              {assignment.attachments && assignment.attachments.length > 0 && (
                                <div className="mt-3 flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {assignment.attachments.length} attachment(s)
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-2">
                              {assignment.status === 'pending' && (
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                  Submit Assignment
                                </button>
                              )}
                              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {selectedTab === 'exams' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Upcoming Examinations
                </h3>
                
                <div className="space-y-6">
                  {upcomingExams.map(exam => {
                    const daysLeft = getDaysUntil(exam.date);
                    const isUrgent = daysLeft <= 7;
                    
                    return (
                      <div key={exam.id} className={`border rounded-2xl p-6 transition-all hover:shadow-lg ${
                        isUrgent ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{exam.subject}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{exam.subjectCode}</p>
                              </div>
                              <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  exam.type === 'final' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                  exam.type === 'midterm' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                  exam.type === 'practical' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                }`}>
                                  {exam.type.toUpperCase()}
                                </span>
                                <div className={`text-sm mt-1 ${isUrgent ? 'text-orange-600 dark:text-orange-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                                  {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Today' : 'Past due'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600 dark:text-gray-400">Date:</span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">{formatDate(exam.date)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600 dark:text-gray-400">Time:</span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">{exam.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600 dark:text-gray-400">Venue:</span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">{exam.venue}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Target className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">{exam.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Award className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600 dark:text-gray-400">Max Marks:</span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">{exam.maxMarks}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Syllabus Coverage:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {exam.syllabus.map((topic, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Important Instructions:</h5>
                                <ul className="space-y-1">
                                  {exam.instructions.map((instruction, index) => (
                                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                      {instruction}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                              Download Admit Card
                            </button>
                            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                              View Syllabus
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedTab === 'profile' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Student Profile
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Card */}
                  <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                        {studentInfo.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{studentInfo.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{studentInfo.rollNumber}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>CGPA: {studentInfo.cgpa}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          <span>Rank: {studentInfo.rank}/{studentInfo.totalStudents}</span>
                        </div>
                      </div>
                      
                      <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  
                  {/* Profile Details */}
                  <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Personal Information</h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Roll Number</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.rollNumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Registration Number</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.registrationNumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Blood Group</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.bloodGroup}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.address}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Parent Contact</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.parentContact}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Academic Information */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 mt-6">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Academic Information</h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Department</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.department}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Semester</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.semester}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Batch</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.batch}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Section</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.section}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Mentor</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.mentorName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Current SGPA</label>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{studentInfo.sgpa}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Notifications
                </h2>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {stats.unreadNotifications > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Mark all as read ({stats.unreadNotifications})
                </button>
              )}
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              {notifications.map((notification) => (
                <div key={notification.id} className={`mb-4 p-4 rounded-xl transition-all cursor-pointer ${
                  getNotificationStyle(notification.type, notification.priority)
                } ${!notification.read ? 'shadow-md' : 'opacity-75'}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {formatDate(notification.date)}
                        </span>
                        <div className="flex items-center gap-2">
                          {notification.actionRequired && (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full">
                              Action Required
                            </span>
                          )}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
