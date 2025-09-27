import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Award,
  ClipboardList,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Building,
  Target,
  Star,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  Filter,
  Search,
  RefreshCw,
  Settings,
  Bell,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  Zap,
  Layers,
  Database,
  Monitor,
  Wifi,
  Server,
  HardDrive,
  MousePointer,
  Grid,
  List,
  X,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  ExternalLink,
  Info,
  Flag,
  Hash,
  Percent,
  DollarSign,
  Calendar as CalendarIcon,
  UserCheck,
  UserX,
  BookMarked,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Presentation,
  FlaskConical,
  Microscope,
  Calculator,
  Brain,
  Lightbulb,
  Puzzle,
  Cpu,
  Code,
  FileCode,
  Terminal,
  Layers3,
  Network,
  Binary,
  Workflow,
  GitBranch,
  ChartBar
} from 'lucide-react';

// Interfaces for HOD-specific data structures
interface FacultyMember {
  id: string;
  name: string;
  employeeId: string;
  designation: string;
  experience: number;
  qualification: string;
  specialization: string[];
  email: string;
  phone: string;
  joiningDate: string;
  currentSubjects: string[];
  weeklyWorkload: number;
  maxWorkload: number;
  studentFeedback: number;
  researchPapers: number;
  attendanceRate: number;
  classesCompleted: number;
  totalClasses: number;
  leaveBalance: number;
  performance: 'excellent' | 'good' | 'average' | 'needs_improvement';
  isOnLeave: boolean;
  achievements: string[];
  mentees: number;
}

interface StudentBatch {
  id: string;
  batchName: string;
  semester: number;
  year: number;
  totalStudents: number;
  activeStudents: number;
  avgAttendance: number;
  avgCGPA: number;
  passPercentage: number;
  placedStudents: number;
  classCoordinator: string;
  subjects: string[];
  upcomingExams: number;
}

interface SubjectData {
  id: string;
  name: string;
  code: string;
  semester: number;
  credits: number;
  type: 'theory' | 'practical' | 'project';
  faculty: string;
  enrolledStudents: number;
  avgMarks: number;
  passPercentage: number;
  completionRate: number;
  feedback: number;
  nextExam: string;
  syllabus: {
    completed: number;
    total: number;
  };
}

interface HODMetrics {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  icon: React.ReactNode;
  color: string;
  description: string;
  target?: number;
  achieved?: number;
}

interface DepartmentActivity {
  id: string;
  type: 'faculty' | 'student' | 'academic' | 'research' | 'placement' | 'event' | 'meeting';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'in_progress' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
  deadline?: string;
  category: string;
}

interface ResearchProject {
  id: string;
  title: string;
  pi: string; // Principal Investigator
  coInvestigators: string[];
  students: string[];
  fundingAgency: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'completed' | 'proposed' | 'rejected';
  progress: number;
  publications: number;
  patents: number;
}

interface PlacementRecord {
  id: string;
  studentName: string;
  studentId: string;
  company: string;
  package: number;
  jobRole: string;
  placementType: 'on_campus' | 'off_campus' | 'internship' | 'higher_studies';
  semester: number;
  cgpa: number;
  date: string;
  status: 'placed' | 'selected' | 'interview_scheduled';
}

const HODAcademicDashboard: React.FC = () => {
  // State management
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester' | 'year'>('month');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedView, setSelectedView] = useState<'overview' | 'faculty' | 'students' | 'subjects' | 'research' | 'placements'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [facultyFilter, setFacultyFilter] = useState<'all' | 'present' | 'on_leave'>('all');

  // Sample HOD Department: Computer Science & Engineering
  const departmentInfo = {
    name: 'Computer Science & Engineering',
    shortName: 'CSE',
    hodName: 'Dr. Rajesh Kumar',
    establishedYear: '1995',
    vision: 'To be a center of excellence in computer science education and research',
    accreditation: 'NBA Accredited, NAAC A+ Grade'
  };

  // Sample faculty data for CSE department
  const facultyMembers: FacultyMember[] = [
    {
      id: 'f001',
      name: 'Dr. Anjali Sharma',
      employeeId: 'CSE001',
      designation: 'Associate Professor',
      experience: 12,
      qualification: 'Ph.D in Computer Science',
      specialization: ['Data Structures', 'Algorithms', 'Machine Learning'],
      email: 'anjali.sharma@college.edu',
      phone: '+91-9876543210',
      joiningDate: '2012-07-15',
      currentSubjects: ['Data Structures', 'Design & Analysis of Algorithms', 'ML Lab'],
      weeklyWorkload: 18,
      maxWorkload: 20,
      studentFeedback: 4.6,
      researchPapers: 25,
      attendanceRate: 96.5,
      classesCompleted: 45,
      totalClasses: 48,
      leaveBalance: 12,
      performance: 'excellent',
      isOnLeave: false,
      achievements: ['Best Faculty Award 2023', 'Outstanding Research Publication'],
      mentees: 15
    },
    {
      id: 'f002',
      name: 'Prof. Vikram Singh',
      employeeId: 'CSE002',
      designation: 'Assistant Professor',
      experience: 8,
      qualification: 'M.Tech in CSE, Ph.D pursuing',
      specialization: ['Database Systems', 'Web Development', 'Software Engineering'],
      email: 'vikram.singh@college.edu',
      phone: '+91-9876543211',
      joiningDate: '2016-08-01',
      currentSubjects: ['DBMS', 'Web Technologies', 'Software Engineering'],
      weeklyWorkload: 20,
      maxWorkload: 20,
      studentFeedback: 4.3,
      researchPapers: 12,
      attendanceRate: 94.2,
      classesCompleted: 42,
      totalClasses: 44,
      leaveBalance: 8,
      performance: 'good',
      isOnLeave: false,
      achievements: ['Innovation in Teaching Award'],
      mentees: 12
    },
    {
      id: 'f003',
      name: 'Dr. Priya Mehta',
      employeeId: 'CSE003',
      designation: 'Assistant Professor',
      experience: 6,
      qualification: 'Ph.D in Artificial Intelligence',
      specialization: ['AI/ML', 'Deep Learning', 'Neural Networks'],
      email: 'priya.mehta@college.edu',
      phone: '+91-9876543212',
      joiningDate: '2018-12-15',
      currentSubjects: ['AI Fundamentals', 'Machine Learning', 'Deep Learning Lab'],
      weeklyWorkload: 16,
      maxWorkload: 20,
      studentFeedback: 4.8,
      researchPapers: 18,
      attendanceRate: 98.1,
      classesCompleted: 40,
      totalClasses: 40,
      leaveBalance: 15,
      performance: 'excellent',
      isOnLeave: false,
      achievements: ['Young Researcher Award', 'Best Paper Award'],
      mentees: 20
    },
    {
      id: 'f004',
      name: 'Prof. Amit Kumar',
      employeeId: 'CSE004',
      designation: 'Assistant Professor',
      experience: 4,
      qualification: 'M.Tech in CSE',
      specialization: ['Computer Networks', 'Cybersecurity', 'IoT'],
      email: 'amit.kumar@college.edu',
      phone: '+91-9876543213',
      joiningDate: '2020-07-20',
      currentSubjects: ['Computer Networks', 'Network Security', 'IoT Lab'],
      weeklyWorkload: 18,
      maxWorkload: 20,
      studentFeedback: 4.1,
      researchPapers: 8,
      attendanceRate: 92.8,
      classesCompleted: 38,
      totalClasses: 42,
      leaveBalance: 10,
      performance: 'good',
      isOnLeave: true,
      achievements: ['Cybersecurity Workshop Organizer'],
      mentees: 10
    }
  ];

  const studentBatches: StudentBatch[] = [
    {
      id: 'b001',
      batchName: '2024-28 Batch',
      semester: 1,
      year: 1,
      totalStudents: 120,
      activeStudents: 118,
      avgAttendance: 94.5,
      avgCGPA: 8.2,
      passPercentage: 96.8,
      placedStudents: 0,
      classCoordinator: 'Dr. Anjali Sharma',
      subjects: ['Programming in C', 'Mathematics-I', 'Physics', 'Chemistry'],
      upcomingExams: 4
    },
    {
      id: 'b002',
      batchName: '2023-27 Batch',
      semester: 3,
      year: 2,
      totalStudents: 115,
      activeStudents: 113,
      avgAttendance: 91.2,
      avgCGPA: 7.9,
      passPercentage: 94.2,
      placedStudents: 0,
      classCoordinator: 'Prof. Vikram Singh',
      subjects: ['Data Structures', 'DBMS', 'Computer Organization', 'Discrete Mathematics'],
      upcomingExams: 5
    },
    {
      id: 'b003',
      batchName: '2022-26 Batch',
      semester: 5,
      year: 3,
      totalStudents: 108,
      activeStudents: 106,
      avgAttendance: 89.7,
      avgCGPA: 8.1,
      passPercentage: 92.6,
      placedStudents: 5,
      classCoordinator: 'Dr. Priya Mehta',
      subjects: ['Machine Learning', 'Software Engineering', 'Computer Networks'],
      upcomingExams: 3
    },
    {
      id: 'b004',
      batchName: '2021-25 Batch',
      semester: 7,
      year: 4,
      totalStudents: 102,
      activeStudents: 98,
      avgAttendance: 88.3,
      avgCGPA: 8.4,
      passPercentage: 91.2,
      placedStudents: 78,
      classCoordinator: 'Prof. Amit Kumar',
      subjects: ['Project Work', 'Advanced AI', 'Cybersecurity', 'Industry Internship'],
      upcomingExams: 2
    }
  ];

  const subjectsData: SubjectData[] = [
    {
      id: 's001',
      name: 'Data Structures & Algorithms',
      code: 'CSE301',
      semester: 3,
      credits: 4,
      type: 'theory',
      faculty: 'Dr. Anjali Sharma',
      enrolledStudents: 113,
      avgMarks: 78.5,
      passPercentage: 94.7,
      completionRate: 93.8,
      feedback: 4.6,
      nextExam: '2024-11-15',
      syllabus: {
        completed: 85,
        total: 100
      }
    },
    {
      id: 's002',
      name: 'Database Management Systems',
      code: 'CSE302',
      semester: 3,
      credits: 4,
      type: 'theory',
      faculty: 'Prof. Vikram Singh',
      enrolledStudents: 113,
      avgMarks: 82.1,
      passPercentage: 96.5,
      completionRate: 89.4,
      feedback: 4.3,
      nextExam: '2024-11-16',
      syllabus: {
        completed: 78,
        total: 100
      }
    },
    {
      id: 's003',
      name: 'Machine Learning',
      code: 'CSE501',
      semester: 5,
      credits: 3,
      type: 'theory',
      faculty: 'Dr. Priya Mehta',
      enrolledStudents: 106,
      avgMarks: 85.3,
      passPercentage: 98.1,
      completionRate: 91.5,
      feedback: 4.8,
      nextExam: '2024-11-18',
      syllabus: {
        completed: 92,
        total: 100
      }
    },
    {
      id: 's004',
      name: 'Computer Networks Lab',
      code: 'CSE504',
      semester: 5,
      credits: 2,
      type: 'practical',
      faculty: 'Prof. Amit Kumar',
      enrolledStudents: 106,
      avgMarks: 88.7,
      passPercentage: 100,
      completionRate: 87.2,
      feedback: 4.1,
      nextExam: '2024-11-20',
      syllabus: {
        completed: 70,
        total: 100
      }
    }
  ];

  const hodMetrics: HODMetrics[] = [
    {
      id: 'faculty_strength',
      title: 'Faculty Strength',
      value: facultyMembers.length,
      change: 8.3,
      changeType: 'increase',
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      description: 'Total teaching faculty in department',
      target: 25,
      achieved: facultyMembers.length
    },
    {
      id: 'student_strength',
      title: 'Total Students',
      value: studentBatches.reduce((sum, batch) => sum + batch.totalStudents, 0),
      change: 5.2,
      changeType: 'increase',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'green',
      description: 'Students across all batches',
      target: 500,
      achieved: studentBatches.reduce((sum, batch) => sum + batch.totalStudents, 0)
    },
    {
      id: 'avg_attendance',
      title: 'Department Attendance',
      value: `${(studentBatches.reduce((sum, batch) => sum + batch.avgAttendance, 0) / studentBatches.length).toFixed(1)}%`,
      change: -2.1,
      changeType: 'decrease',
      icon: <Activity className="w-6 h-6" />,
      color: 'orange',
      description: 'Average attendance across all semesters',
      target: 95,
      achieved: Math.round(studentBatches.reduce((sum, batch) => sum + batch.avgAttendance, 0) / studentBatches.length)
    },
    {
      id: 'placement_rate',
      title: 'Current Placement',
      value: '76.5%',
      change: 15.8,
      changeType: 'increase',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'purple',
      description: 'Final year students placed',
      target: 90,
      achieved: 77
    },
    {
      id: 'research_projects',
      title: 'Active Research',
      value: '12',
      change: 22.4,
      changeType: 'increase',
      icon: <FlaskConical className="w-6 h-6" />,
      color: 'indigo',
      description: 'Ongoing research projects',
      target: 15,
      achieved: 12
    },
    {
      id: 'faculty_performance',
      title: 'Faculty Rating',
      value: '4.45',
      change: 6.8,
      changeType: 'increase',
      icon: <Star className="w-6 h-6" />,
      color: 'pink',
      description: 'Average faculty feedback rating',
      target: 4.5,
      achieved: 4.45
    }
  ];

  const departmentActivities: DepartmentActivity[] = [
    {
      id: '1',
      type: 'faculty',
      title: 'Prof. Amit Kumar on Medical Leave',
      description: 'Applied for 15 days medical leave starting from today. Coverage arranged.',
      timestamp: '2 hours ago',
      status: 'in_progress',
      priority: 'medium',
      assignedTo: 'Dr. Anjali Sharma',
      category: 'Leave Management'
    },
    {
      id: '2',
      type: 'academic',
      title: 'Mid-Term Results Published',
      description: 'Semester III mid-term examination results published. Overall pass rate: 94.2%',
      timestamp: '5 hours ago',
      status: 'completed',
      priority: 'high',
      category: 'Examinations'
    },
    {
      id: '3',
      type: 'student',
      title: 'Student Counseling Session',
      description: '5 students from Semester V scheduled for academic counseling session',
      timestamp: '1 day ago',
      status: 'pending',
      priority: 'medium',
      deadline: '2024-11-12',
      category: 'Student Welfare'
    },
    {
      id: '4',
      type: 'research',
      title: 'New Research Proposal Submitted',
      description: 'Dr. Priya Mehta submitted AI research proposal to DST for ₹15 Lakhs funding',
      timestamp: '2 days ago',
      status: 'pending',
      priority: 'high',
      category: 'Research & Development'
    },
    {
      id: '5',
      type: 'placement',
      title: 'Microsoft Campus Drive Results',
      description: '8 students selected for SDE roles with average package of ₹18 LPA',
      timestamp: '3 days ago',
      status: 'completed',
      priority: 'high',
      category: 'Placements'
    }
  ];

  const researchProjects: ResearchProject[] = [
    {
      id: 'r001',
      title: 'Machine Learning for Healthcare Diagnostics',
      pi: 'Dr. Priya Mehta',
      coInvestigators: ['Dr. Anjali Sharma'],
      students: ['Rahul Sharma', 'Priya Patel', 'Amit Singh'],
      fundingAgency: 'DST',
      amount: 1500000,
      startDate: '2023-04-01',
      endDate: '2025-03-31',
      status: 'ongoing',
      progress: 65,
      publications: 3,
      patents: 1
    },
    {
      id: 'r002',
      title: 'Cybersecurity in IoT Networks',
      pi: 'Prof. Amit Kumar',
      coInvestigators: ['Prof. Vikram Singh'],
      students: ['Neha Gupta', 'Rohit Kumar'],
      fundingAgency: 'AICTE',
      amount: 800000,
      startDate: '2023-07-01',
      endDate: '2024-12-31',
      status: 'ongoing',
      progress: 78,
      publications: 2,
      patents: 0
    }
  ];

  const placementRecords: PlacementRecord[] = [
    {
      id: 'p001',
      studentName: 'Aarav Sharma',
      studentId: 'CSE21001',
      company: 'Microsoft',
      package: 1800000,
      jobRole: 'Software Development Engineer',
      placementType: 'on_campus',
      semester: 8,
      cgpa: 9.2,
      date: '2024-11-10',
      status: 'placed'
    },
    {
      id: 'p002',
      studentName: 'Priya Singh',
      studentId: 'CSE21002',
      company: 'Google',
      package: 2200000,
      jobRole: 'Software Engineer',
      placementType: 'on_campus',
      semester: 8,
      cgpa: 9.5,
      date: '2024-11-08',
      status: 'placed'
    },
    {
      id: 'p003',
      studentName: 'Rohit Kumar',
      studentId: 'CSE21003',
      company: 'Amazon',
      package: 2000000,
      jobRole: 'SDE-1',
      placementType: 'on_campus',
      semester: 8,
      cgpa: 9.0,
      date: '2024-11-12',
      status: 'selected'
    }
  ];

  // Computed values
  const filteredActivities = useMemo(() => {
    return departmentActivities.filter(activity =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredFaculty = useMemo(() => {
    let filtered = facultyMembers;
    if (facultyFilter === 'present') {
      filtered = facultyMembers.filter(f => !f.isOnLeave);
    } else if (facultyFilter === 'on_leave') {
      filtered = facultyMembers.filter(f => f.isOnLeave);
    }
    return filtered.filter(faculty =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [facultyFilter, searchTerm]);

  // Utility functions
  const getMetricColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      pink: 'from-pink-500 to-pink-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'good': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'average': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'needs_improvement': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'faculty': return <Users className="w-5 h-5" />;
      case 'student': return <GraduationCap className="w-5 h-5" />;
      case 'academic': return <BookOpen className="w-5 h-5" />;
      case 'research': return <FlaskConical className="w-5 h-5" />;
      case 'placement': return <Briefcase className="w-5 h-5" />;
      case 'event': return <Calendar className="w-5 h-5" />;
      case 'meeting': return <MessageSquare className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'faculty': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'student': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'academic': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'research': return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400';
      case 'placement': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400';
      case 'event': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'meeting': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg--to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                HOD Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-2">
                <Building className="w-5 h-5" />
                {departmentInfo.name}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Est. {departmentInfo.establishedYear}</span>
                <span>•</span>
                <span>{departmentInfo.accreditation}</span>
                <span>•</span>
                <span>HOD: {departmentInfo.hodName}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                />
              </div>
              
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="semester">This Semester</option>
                <option value="year">Academic Year</option>
              </select>
              
              <button
                onClick={() => setLoading(true)}
                className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Department Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
          {hodMetrics.map((metric) => (
            <div
              key={metric.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getMetricColor(metric.color)} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {metric.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {metric.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                    metric.changeType === 'increase' 
                      ? 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30' 
                      : metric.changeType === 'decrease'
                      ? 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30'
                      : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900/30'
                  }`}>
                    {metric.changeType === 'increase' && <ArrowUp className="w-3 h-3 mr-1" />}
                    {metric.changeType === 'decrease' && <ArrowDown className="w-3 h-3 mr-1" />}
                    {Math.abs(metric.change)}%
                  </div>
                  {metric.target && metric.achieved && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {metric.achieved}/{metric.target}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Faculty Overview */}
          <div className="xl:col-span-2">
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Faculty Management
                </h2>
                <div className="flex items-center gap-2">
                  <select
                    value={facultyFilter}
                    onChange={(e) => setFacultyFilter(e.target.value as any)}
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <option value="all">All Faculty</option>
                    <option value="present">Present</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredFaculty.map((faculty) => (
                  <div
                    key={faculty.id}
                    className={`group p-5 rounded-xl border transition-all duration-300 bg-gradient-to-r ${
                      faculty.isOnLeave 
                        ? 'border-orange-200 dark:border-orange-800 from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'
                        : 'border-gray-200 dark:border-gray-700 from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                          {faculty.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            {faculty.name}
                            {faculty.isOnLeave && (
                              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">
                                On Leave
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {faculty.designation} • {faculty.employeeId}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {faculty.qualification} • {faculty.experience}+ years exp
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {faculty.specialization.slice(0, 3).map((spec) => (
                              <span key={spec} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceColor(faculty.performance)}`}>
                        {faculty.performance.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="font-semibold text-blue-700 dark:text-blue-300">{faculty.weeklyWorkload}/{faculty.maxWorkload}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Workload (hrs)</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="font-semibold text-green-700 dark:text-green-300 flex items-center justify-center gap-1">
                          <Star className="w-3 h-3" />
                          {faculty.studentFeedback}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="font-semibold text-purple-700 dark:text-purple-300">{faculty.attendanceRate}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Attendance</div>
                      </div>
                      <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="font-semibold text-indigo-700 dark:text-indigo-300">{faculty.researchPapers}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Publications</div>
                      </div>
                      <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <div className="font-semibold text-pink-700 dark:text-pink-300">{faculty.mentees}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Mentees</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <span>Classes: {faculty.classesCompleted}/{faculty.totalClasses}</span>
                        <span className="mx-2">•</span>
                        <span>Leave Balance: {faculty.leaveBalance} days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                          View Profile
                        </button>
                        <button className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Batches Overview */}
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Student Batches Overview
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1">
                  View Details <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentBatches.map((batch) => (
                  <div
                    key={batch.id}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {batch.batchName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Semester {batch.semester} • Year {batch.year}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Coordinator: {batch.classCoordinator}
                        </p>
                      </div>
                      {batch.upcomingExams > 0 && (
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">
                          {batch.upcomingExams} exams
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="font-semibold text-blue-700 dark:text-blue-300">{batch.totalStudents}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <div className="font-semibold text-green-700 dark:text-green-300">{batch.avgAttendance}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Attendance</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <div className="font-semibold text-purple-700 dark:text-purple-300">{batch.avgCGPA}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Avg CGPA</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Pass Rate: {batch.passPercentage}%</span>
                      {batch.placedStudents > 0 && (
                        <span className="text-green-600 dark:text-green-400">
                          {batch.placedStudents} placed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Activities & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activities
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  View All
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredActivities.slice(0, 6).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)} shrink-0`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1 line-clamp-1">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {activity.timestamp}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {activity.category}
                          </span>
                          <span className={`w-2 h-2 rounded-full ${
                            activity.priority === 'high' ? 'bg-red-500' :
                            activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></span>
                        </div>
                      </div>
                      {activity.status === 'pending' && activity.deadline && (
                        <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                          Due: {formatDate(activity.deadline)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions for HOD */}
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Users className="w-5 h-5 mb-2 mx-auto" />
                  Faculty Report
                </button>
                <button className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <ClipboardList className="w-5 h-5 mb-2 mx-auto" />
                  Exam Schedule
                </button>
                <button className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Bell className="w-5 h-5 mb-2 mx-auto" />
                  Send Notice
                </button>
                <button className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <FileText className="w-5 h-5 mb-2 mx-auto" />
                  Generate Report
                </button>
                <button className="p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Calendar className="w-5 h-5 mb-2 mx-auto" />
                  Schedule Meeting
                </button>
                <button className="p-4 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm font-medium hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <BarChart3 className="w-5 h-5 mb-2 mx-auto" />
                  View Analytics
                </button>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Subject Performance
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {subjectsData.slice(0, 3).map((subject) => (
                  <div
                    key={subject.id}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-green-50 dark:from-gray-800 dark:to-green-900/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          {subject.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {subject.code} • {subject.faculty} • {subject.credits} Credits
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subject.type === 'theory' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        subject.type === 'practical' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      }`}>
                        {subject.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{subject.enrolledStudents}</div>
                        <div className="text-gray-600 dark:text-gray-400">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{subject.avgMarks}</div>
                        <div className="text-gray-600 dark:text-gray-400">Avg Marks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{subject.passPercentage}%</div>
                        <div className="text-gray-600 dark:text-gray-400">Pass Rate</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Syllabus: {subject.syllabus.completed}%
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-gray-600 dark:text-gray-400">{subject.feedback}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Research & Placement Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Research Projects */}
          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Active Research Projects
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {researchProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        PI: {project.pi}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Funding: {project.fundingAgency} • {formatCurrency(project.amount)}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{project.students.length}</div>
                      <div className="text-gray-600 dark:text-gray-400">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{project.publications}</div>
                      <div className="text-gray-600 dark:text-gray-400">Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{project.patents}</div>
                      <div className="text-gray-600 dark:text-gray-400">Patents</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Timeline: {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Placements */}
          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Recent Placements
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {placementRecords.map((placement) => (
                <div
                  key={placement.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-green-50 dark:from-gray-800 dark:to-green-900/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {placement.studentName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {placement.studentId} • CGPA: {placement.cgpa}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      placement.status === 'placed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      placement.status === 'selected' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {placement.status}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {placement.company}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {placement.jobRole}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(placement.package)} CTC
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        placement.placementType === 'on_campus' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        placement.placementType === 'off_campus' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                        'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                      }`}>
                        {placement.placementType.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(placement.date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Placement Summary */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Placement Summary (Final Year)
                </h4>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-blue-700 dark:text-blue-300">78</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Placed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-700 dark:text-purple-300">₹12.5L</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Avg Package</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-700 dark:text-green-300">76.5%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
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
                  Department Notifications
                </h2>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              {departmentActivities.filter(activity => activity.priority === 'high' || activity.status === 'pending').map((activity) => (
                <div key={activity.id} className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {activity.timestamp}
                        </span>
                        {activity.status === 'pending' && (
                          <button className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                            Take Action
                          </button>
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
    </div>
  );
};

export default HODAcademicDashboard;
