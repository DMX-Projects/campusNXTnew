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
  Calendar as CalendarIcon
} from 'lucide-react';

// Interfaces for data structures
interface DepartmentData {
  id: string;
  name: string;
  shortName: string;
  hod: string;
  totalStudents: number;
  totalFaculty: number;
  activePrograms: number;
  avgAttendance: number;
  passPercentage: number;
  placementRate: number;
  avgCGPA: number;
  researchProjects: number;
  publications: number;
  funding: number;
  status: 'excellent' | 'good' | 'needs_attention';
}

interface AcademicMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface RecentActivity {
  id: string;
  type: 'admission' | 'examination' | 'event' | 'achievement' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'in_progress';
  department?: string;
  priority: 'high' | 'medium' | 'low';
}

interface ExamSchedule {
  id: string;
  examType: 'mid_term' | 'end_term' | 'supplementary' | 'entrance';
  subject: string;
  department: string;
  semester: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  invigilator: string;
  studentsCount: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

interface FacultyPerformance {
  id: string;
  name: string;
  department: string;
  designation: string;
  experience: number;
  qualification: string;
  subjectsTaught: string[];
  studentFeedback: number;
  researchPapers: number;
  attendanceRate: number;
  classesCompleted: number;
  totalClasses: number;
  rating: number;
  achievements: string[];
}

interface PlacementData {
  id: string;
  company: string;
  package: number;
  studentsSelected: number;
  department: string;
  jobRole: string;
  placementType: 'on_campus' | 'off_campus' | 'internship';
  date: string;
  status: 'completed' | 'ongoing' | 'upcoming';
}

const PrincipalAcademicDashboard: React.FC = () => {
  // State management
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester' | 'year'>('month');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedView, setSelectedView] = useState<'overview' | 'departments' | 'faculty' | 'students' | 'examinations' | 'placements'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Sample data - In real implementation, this would come from API
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const departmentData: DepartmentData[] = [
    {
      id: 'cse',
      name: 'Computer Science & Engineering',
      shortName: 'CSE',
      hod: 'Dr. Rajesh Kumar',
      totalStudents: 480,
      totalFaculty: 24,
      activePrograms: 3,
      avgAttendance: 92.5,
      passPercentage: 95.8,
      placementRate: 89.2,
      avgCGPA: 8.4,
      researchProjects: 15,
      publications: 32,
      funding: 2500000,
      status: 'excellent'
    },
    {
      id: 'ece',
      name: 'Electronics & Communication Engineering',
      shortName: 'ECE',
      hod: 'Dr. Priya Sharma',
      totalStudents: 360,
      totalFaculty: 18,
      activePrograms: 2,
      avgAttendance: 90.2,
      passPercentage: 93.4,
      placementRate: 85.7,
      avgCGPA: 8.1,
      researchProjects: 12,
      publications: 24,
      funding: 1800000,
      status: 'excellent'
    },
    {
      id: 'mech',
      name: 'Mechanical Engineering',
      shortName: 'MECH',
      hod: 'Dr. Arun Singh',
      totalStudents: 420,
      totalFaculty: 21,
      activePrograms: 2,
      avgAttendance: 88.7,
      passPercentage: 91.2,
      placementRate: 78.5,
      avgCGPA: 7.9,
      researchProjects: 10,
      publications: 18,
      funding: 2200000,
      status: 'good'
    },
    {
      id: 'civil',
      name: 'Civil Engineering',
      shortName: 'CIVIL',
      hod: 'Dr. Meera Patel',
      totalStudents: 300,
      totalFaculty: 15,
      activePrograms: 2,
      avgAttendance: 87.3,
      passPercentage: 89.6,
      placementRate: 72.4,
      avgCGPA: 7.7,
      researchProjects: 8,
      publications: 14,
      funding: 1600000,
      status: 'needs_attention'
    }
  ];

  const academicMetrics: AcademicMetric[] = [
    {
      id: 'total_students',
      title: 'Total Students',
      value: '1,560',
      change: 8.2,
      changeType: 'increase',
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      description: 'Active students across all programs'
    },
    {
      id: 'total_faculty',
      title: 'Total Faculty',
      value: '78',
      change: 5.1,
      changeType: 'increase',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'green',
      description: 'Teaching and research faculty'
    },
    {
      id: 'avg_attendance',
      title: 'Overall Attendance',
      value: '89.7%',
      change: -2.1,
      changeType: 'decrease',
      icon: <Activity className="w-6 h-6" />,
      color: 'orange',
      description: 'Average attendance across all departments'
    },
    {
      id: 'placement_rate',
      title: 'Placement Rate',
      value: '81.5%',
      change: 12.3,
      changeType: 'increase',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'purple',
      description: 'Students placed in current academic year'
    },
    {
      id: 'research_projects',
      title: 'Research Projects',
      value: '45',
      change: 18.9,
      changeType: 'increase',
      icon: <Target className="w-6 h-6" />,
      color: 'indigo',
      description: 'Active research projects'
    },
    {
      id: 'avg_cgpa',
      title: 'Average CGPA',
      value: '8.03',
      change: 4.2,
      changeType: 'increase',
      icon: <Award className="w-6 h-6" />,
      color: 'pink',
      description: 'Institution-wide average CGPA'
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'CSE Department Wins National Award',
      description: 'Department of CSE received the Best Department Award for Academic Excellence',
      timestamp: '2 hours ago',
      status: 'completed',
      department: 'CSE',
      priority: 'high'
    },
    {
      id: '2',
      type: 'examination',
      title: 'Mid-Term Examinations Completed',
      description: 'All mid-term examinations for semester V completed successfully',
      timestamp: '5 hours ago',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'admission',
      title: 'New Faculty Recruitment',
      description: '5 new faculty members joined the institution for the new academic year',
      timestamp: '1 day ago',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Attendance Alert - Civil Engineering',
      description: 'Civil Engineering department attendance dropped below 90% threshold',
      timestamp: '2 days ago',
      status: 'pending',
      department: 'CIVIL',
      priority: 'high'
    },
    {
      id: '5',
      type: 'event',
      title: 'Annual Tech Fest Planning',
      description: 'Technical festival planning committee meeting scheduled',
      timestamp: '3 days ago',
      status: 'in_progress',
      priority: 'low'
    }
  ];

  const upcomingExams: ExamSchedule[] = [
    {
      id: '1',
      examType: 'end_term',
      subject: 'Data Structures & Algorithms',
      department: 'CSE',
      semester: 'III',
      date: '2024-11-15',
      time: '10:00 AM',
      duration: '3 hours',
      venue: 'Main Hall A',
      invigilator: 'Dr. Rajesh Kumar',
      studentsCount: 120,
      status: 'scheduled'
    },
    {
      id: '2',
      examType: 'mid_term',
      subject: 'Digital Signal Processing',
      department: 'ECE',
      semester: 'V',
      date: '2024-11-16',
      time: '2:00 PM',
      duration: '2 hours',
      venue: 'ECE Lab 1',
      invigilator: 'Dr. Priya Sharma',
      studentsCount: 85,
      status: 'scheduled'
    },
    {
      id: '3',
      examType: 'supplementary',
      subject: 'Thermodynamics',
      department: 'MECH',
      semester: 'IV',
      date: '2024-11-17',
      time: '9:00 AM',
      duration: '3 hours',
      venue: 'Engineering Block B',
      invigilator: 'Dr. Arun Singh',
      studentsCount: 15,
      status: 'scheduled'
    }
  ];

  const placementData: PlacementData[] = [
    {
      id: '1',
      company: 'Microsoft India',
      package: 1800000,
      studentsSelected: 8,
      department: 'CSE',
      jobRole: 'Software Engineer',
      placementType: 'on_campus',
      date: '2024-11-10',
      status: 'completed'
    },
    {
      id: '2',
      company: 'Infosys Limited',
      package: 950000,
      studentsSelected: 25,
      department: 'CSE,ECE',
      jobRole: 'Systems Engineer',
      placementType: 'on_campus',
      date: '2024-11-08',
      status: 'completed'
    },
    {
      id: '3',
      company: 'Tata Motors',
      package: 1200000,
      studentsSelected: 12,
      department: 'MECH',
      jobRole: 'Design Engineer',
      placementType: 'on_campus',
      date: '2024-11-12',
      status: 'upcoming'
    }
  ];

  // Computed values
  const filteredActivities = useMemo(() => {
    return recentActivities.filter(activity =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalStudents = useMemo(() => {
    return departmentData.reduce((sum, dept) => sum + dept.totalStudents, 0);
  }, [departmentData]);

  const totalFaculty = useMemo(() => {
    return departmentData.reduce((sum, dept) => sum + dept.totalFaculty, 0);
  }, [departmentData]);

  const overallPlacementRate = useMemo(() => {
    return (departmentData.reduce((sum, dept) => sum + dept.placementRate, 0) / departmentData.length).toFixed(1);
  }, [departmentData]);

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

  const getDepartmentStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'good': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'needs_attention': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'admission': return <Users className="w-5 h-5" />;
      case 'examination': return <ClipboardList className="w-5 h-5" />;
      case 'event': return <Calendar className="w-5 h-5" />;
      case 'achievement': return <Award className="w-5 h-5" />;
      case 'alert': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'admission': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'examination': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'event': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'achievement': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'alert': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                Academic Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Principal's Academic Overview & Management
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
          {academicMetrics.map((metric) => (
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
                <div className="flex items-center space-x-2">
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Department Overview */}
          <div className="xl:col-span-2">
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Department Performance Overview
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {departmentData.map((dept) => (
                  <div
                    key={dept.id}
                    className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {dept.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          HOD: {dept.hod}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDepartmentStatusColor(dept.status)}`}>
                        {dept.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="font-semibold text-blue-700 dark:text-blue-300">{dept.totalStudents}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Students</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="font-semibold text-green-700 dark:text-green-300">{dept.totalFaculty}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Faculty</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="font-semibold text-purple-700 dark:text-purple-300">{dept.avgAttendance}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Attendance</div>
                      </div>
                      <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="font-semibold text-orange-700 dark:text-orange-300">{dept.passPercentage}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Pass Rate</div>
                      </div>
                      <div className="text-center p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="font-semibold text-indigo-700 dark:text-indigo-300">{dept.placementRate}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Placement</div>
                      </div>
                      <div className="text-center p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <div className="font-semibold text-pink-700 dark:text-pink-300">{dept.avgCGPA}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Avg CGPA</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Research: {dept.researchProjects} projects, {dept.publications} publications</span>
                      <span>Funding: {formatCurrency(dept.funding)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Examinations */}
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Upcoming Examinations
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1">
                  View Schedule <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingExams.slice(0, 3).map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exam.examType === 'end_term' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                          exam.examType === 'mid_term' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          {exam.examType.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{exam.department}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {exam.subject}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(exam.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exam.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {exam.studentsCount} students
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{exam.venue}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{exam.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities & Quick Actions */}
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
                {filteredActivities.slice(0, 8).map((activity) => (
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
                          {activity.department && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                              {activity.department}
                            </span>
                          )}
                          <span className={`w-2 h-2 rounded-full ${
                            activity.priority === 'high' ? 'bg-red-500' :
                            activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <FileText className="w-5 h-5 mb-2 mx-auto" />
                  Generate Report
                </button>
                <button className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Calendar className="w-5 h-5 mb-2 mx-auto" />
                  Schedule Meeting
                </button>
                <button className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Bell className="w-5 h-5 mb-2 mx-auto" />
                  Send Notice
                </button>
                <button className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  <BarChart3 className="w-5 h-5 mb-2 mx-auto" />
                  View Analytics
                </button>
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
                {placementData.slice(0, 3).map((placement) => (
                  <div
                    key={placement.id}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-green-50 dark:from-gray-800 dark:to-green-900/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {placement.company}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        placement.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        placement.status === 'ongoing' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {placement.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {placement.jobRole} • {placement.department}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(placement.package)} CTC
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {placement.studentsSelected} selected
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Trends
              </h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  View Details
                </button>
              </div>
            </div>
            
            {/* Placeholder for chart - would integrate with charting library */}
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl flex items-center justify-center border border-dashed border-blue-200 dark:border-blue-800">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-400 dark:text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Performance Analytics Chart</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Interactive charts would be integrated here</p>
              </div>
            </div>
          </div>

          {/* Resource Utilization */}
          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Resource Utilization
              </h2>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Classrooms', used: 85, total: 120, color: 'blue' },
                { name: 'Laboratories', used: 42, total: 55, color: 'green' },
                { name: 'Library Seats', used: 180, total: 250, color: 'purple' },
                { name: 'Faculty Offices', used: 68, total: 80, color: 'orange' },
                { name: 'Computer Labs', used: 15, total: 18, color: 'red' }
              ].map((resource) => {
                const percentage = (resource.used / resource.total) * 100;
                return (
                  <div key={resource.name} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{resource.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {resource.used}/{resource.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getMetricColor(resource.color)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {percentage.toFixed(1)}% utilized
                    </div>
                  </div>
                );
              })}
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
                  Notifications
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
              {recentActivities.filter(activity => activity.priority === 'high').map((activity) => (
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
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.timestamp}
                      </span>
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

export default PrincipalAcademicDashboard;