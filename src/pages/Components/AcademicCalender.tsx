import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Calendar,
  Download,
  FileText,
  Search,
  Filter,
  Eye,
  Clock,
  Building,
  GraduationCap,
  Users,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Star,
  Archive,
  ExternalLink,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Bell,
  Shield,
  Activity,
  TrendingUp,
  BarChart3,
  Award,
  Target,
  Globe,
  Lightbulb,
  Settings,
  Briefcase,
  Upload,
  Edit,
  Trash2,
  Share,
  Print,
  Copy,
  Mail,
  Plus,
  Minus,
  ZoomIn,
  Grid,
  List,
  CalendarDays,
  Tag,
  User
} from 'lucide-react';

interface AcademicEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  category: 'examination' | 'instruction' | 'practical' | 'project' | 'holiday' | 'result' | 'event' | 'meeting' | 'other';
  duration: string;
  isImportant: boolean;
  status: 'upcoming' | 'ongoing' | 'completed';
  course?: string;
  semester?: string;
  department?: string;
}

interface AcademicCalendarPDF {
  id: string;
  title: string;
  description: string;
  fileName: string;
  filePath: string;
  uploadDate: string;
  uploadedBy: string;
  academicYear: string;
  semester: string;
  department?: string;
  course?: string;
  fileSize: number;
  downloadCount: number;
  isActive: boolean;
  version: number;
  tags: string[];
}

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

  // Section
  section: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6 lg:p-8 mb-8",
  sectionTitle: "text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2",

  // Calendar Table
  tableContainer: "overflow-auto rounded-xl border border-gray-200 dark:border-gray-700",
  table: "w-full min-w-full border-collapse bg-white dark:bg-gray-900",
  tableHeader: "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700",
  tableHeaderCell: "px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0",
  tableBody: "",
  tableRow: "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
  tableCell: "px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 last:border-r-0 align-top",

  // PDF Grid
  pdfGrid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",
  pdfCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6",
  pdfHeader: "flex items-start gap-4 mb-4",
  pdfIcon: "w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center shrink-0",
  pdfInfo: "flex-1 min-w-0",
  pdfTitle: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2",
  pdfMeta: "text-sm text-gray-600 dark:text-gray-400 space-y-1",

  // Form Elements
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm appearance-none",

  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonSuccess: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
  buttonDanger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md",

  // Tags
  tag: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
  tagDefault: "bg-gray-100 text-gray-800 dark:bg-gray-800 text-gray-300 border border-gray-200 dark:border-gray-700",
  tagPrimary: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800",
  tagSuccess: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  tagWarning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
  tagDanger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800",

  // Alert
  alert: "p-4 rounded-xl border mb-6",
  alertInfo: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  alertSuccess: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
  alertWarning: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200",

  // Filters
  filtersSection: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm p-4 lg:p-6 mb-8",
  filtersHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6",
  filtersTitle: "text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  filtersActions: "flex flex-wrap gap-2",
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",

  // Empty State
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Tabs
  tabsContainer: "mb-8",
  tabsList: "flex flex-wrap border-b border-gray-200 dark:border-gray-700",
  tab: "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
  tabActive: "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400",
  tabInactive: "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600",
};

// Sample academic events for all courses and departments
const SAMPLE_ACADEMIC_EVENTS: AcademicEvent[] = [
  {
    id: "1",
    title: "Academic Year Commencement",
    description: "Beginning of academic year 2024-25 for all courses and departments",
    startDate: "2024-09-01",
    endDate: "2024-09-01",
    category: "instruction",
    duration: "1 Day",
    isImportant: true,
    status: "completed",
    // course: "All Courses",
    semester: "All Semesters"
  },
  {
    id: "2",
    title: "First Mid-Term Examinations",
    description: "Mid-term examinations for all undergraduate and postgraduate courses",
    startDate: "2024-10-15",
    endDate: "2024-10-25",
    category: "examination",
    duration: "10 Days",
    isImportant: true,
    status: "completed",
    // course: "All Courses"
  },
  {
    id: "3",
    title: "Dussehra Holidays",
    description: "Festival holidays for Dussehra celebration",
    startDate: "2024-10-12",
    endDate: "2024-10-14",
    category: "holiday",
    duration: "3 Days",
    isImportant: false,
    status: "completed",
    // course: "All Courses"
  },
  {
    id: "4",
    title: "Annual Technical Fest - TechnoVision 2024",
    description: "College annual technical festival with competitions and workshops",
    startDate: "2024-11-15",
    endDate: "2024-11-17",
    category: "event",
    duration: "3 Days",
    isImportant: true,
    status: "completed",
    // course: "All Courses"
  },
  {
    id: "5",
    title: "Second Mid-Term Examinations",
    description: "Second internal assessment examinations for all departments",
    startDate: "2024-12-10",
    endDate: "2024-12-20",
    category: "examination",
    duration: "10 Days",
    isImportant: true,
    status: "completed",
    // course: "All Courses"
  },
  {
    id: "6",
    title: "Winter Break",
    description: "Winter vacation break for students and faculty",
    startDate: "2024-12-22",
    endDate: "2025-01-05",
    category: "holiday",
    duration: "2 Weeks",
    isImportant: false,
    status: "completed",
    // course: "All Courses"
  },
  {
    id: "7",
    title: "Semester End Examinations - Even Semester",
    description: "Final examinations for even semester (II, IV, VI, VIII)",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    category: "examination",
    duration: "1 Month",
    isImportant: true,
    status: "completed",
    // course: "All Courses"
  },
  {
    id: "8",
    title: "Practical Examinations",
    description: "Laboratory and practical examinations for all engineering courses",
    startDate: "2025-02-20",
    endDate: "2025-03-05",
    category: "practical",
    duration: "2 Weeks",
    isImportant: true,
    status: "completed",
    // course: "Engineering Courses"
  },
  {
    id: "9",
    title: "Results Declaration - Even Semester",
    description: "Publication of even semester examination results",
    startDate: "2025-03-15",
    endDate: "2025-03-15",
    category: "result",
    duration: "1 Day",
    isImportant: true,
    status: "completed",
    // course: "All Courses"
  },
  {
    id: "10",
    title: "Odd Semester Classes Begin",
    description: "Commencement of odd semester (I, III, V, VII) classes",
    startDate: "2025-03-20",
    endDate: "2025-03-20",
    category: "instruction",
    duration: "1 Day",
    isImportant: true,
    status: "completed",
    // course: "All Courses"
  },
  {
    id: "11",
    title: "Annual Sports Meet",
    description: "Inter-department sports competition and annual sports day",
    startDate: "2025-04-10",
    endDate: "2025-04-12",
    category: "event",
    duration: "3 Days",
    isImportant: true,
    status: "upcoming",
    // course: "All Courses"
  },
  {
    id: "12",
    title: "Industry Interaction Week",
    description: "Week-long industry expert sessions and placement drives",
    startDate: "2025-04-20",
    endDate: "2025-04-26",
    category: "event",
    duration: "1 Week",
    isImportant: true,
    status: "upcoming",
    // course: "Final Year"
  },
  {
    id: "13",
    title: "Summer Internship Program",
    description: "Mandatory internship program for pre-final year students",
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    category: "project",
    duration: "2 Months",
    isImportant: true,
    status: "upcoming",
    // course: "Pre-Final Year"
  },
  {
    id: "14",
    title: "Faculty Development Program",
    description: "Professional development workshop for teaching faculty",
    startDate: "2025-05-15",
    endDate: "2025-05-19",
    category: "meeting",
    duration: "1 Week",
    isImportant: false,
    status: "upcoming",
    // department: "All Departments"
  },
  {
    id: "15",
    title: "Semester End Examinations - Odd Semester",
    description: "Final examinations for odd semester (I, III, V, VII)",
    startDate: "2025-07-15",
    endDate: "2025-08-15",
    category: "examination",
    duration: "1 Month",
    isImportant: true,
    status: "upcoming",
    // course: "All Courses"
  }
];

// Sample PDF documents for all courses
const SAMPLE_CALENDAR_PDFS: AcademicCalendarPDF[] = [
  {
    id: "pdf-1",
    title: "Academic Calendar 2024-25 - All Courses",
    description: "Complete academic calendar for all undergraduate and postgraduate courses with important dates and schedules.",
    fileName: "Academic_Calendar_2024-25_All_Courses.pdf",
    filePath: "/Academic_Calendar_2024-25_All_Courses.pdf",
    uploadDate: "2024-08-01",
    uploadedBy: "Academic Office",
    academicYear: "2024-25",
    semester: "All Semesters",
    department: "All Departments",
    course: "All Courses",
    fileSize: 234567,
    downloadCount: 456,
    isActive: true,
    version: 2,
    tags: ["Academic Calendar", "Official", "All Courses", "2024-25"]
  },
  {
    id: "pdf-2",
    title: "B.Tech Academic Calendar (AY 2024-25)",
    description: "Detailed academic calendar specifically for all B.Tech courses covering all four years.",
    fileName: "BTech_Academic_Calendar_2024-25.pdf",
    filePath: "/BTech_Academic_Calendar_2024-25.pdf",
    uploadDate: "2024-08-05",
    uploadedBy: "Engineering Dean Office",
    academicYear: "2024-25",
    semester: "All Semesters",
    department: "Engineering",
    course: "B.Tech",
    fileSize: 187432,
    downloadCount: 234,
    isActive: true,
    version: 1,
    tags: ["B.Tech", "Engineering", "Undergraduate", "Official"]
  },
  {
    id: "pdf-3",
    title: "M.Tech & Ph.D Academic Calendar (AY 2024-25)",
    description: "Academic calendar for postgraduate programs including M.Tech and Ph.D with research milestones.",
    fileName: "MTech_PhD_Academic_Calendar_2024-25.pdf",
    filePath: "/MTech_PhD_Academic_Calendar_2024-25.pdf",
    uploadDate: "2024-08-10",
    uploadedBy: "PG Office",
    academicYear: "2024-25",
    semester: "All Semesters",
    department: "All Departments",
    course: "M.Tech & Ph.D",
    fileSize: 156789,
    downloadCount: 89,
    isActive: true,
    version: 1,
    tags: ["M.Tech", "Ph.D", "Postgraduate", "Research"]
  },
  {
    id: "pdf-4",
    title: "Examination Schedule - Mid-Term & Final",
    description: "Detailed examination timetable for mid-term and final examinations across all departments.",
    fileName: "Examination_Schedule_2024-25.pdf",
    filePath: "/Examination_Schedule_2024-25.pdf",
    uploadDate: "2024-09-15",
    uploadedBy: "Examination Cell",
    academicYear: "2024-25",
    semester: "Both Semesters",
    department: "All Departments",
    fileSize: 98765,
    downloadCount: 567,
    isActive: true,
    version: 3,
    tags: ["Examinations", "Timetable", "Mid-Term", "Final"]
  },
  {
    id: "pdf-5",
    title: "Holiday Calendar & Academic Events 2024-25",
    description: "List of holidays, festivals, and special academic events throughout the academic year.",
    fileName: "Holiday_Calendar_2024-25.pdf",
    filePath: "/Holiday_Calendar_2024-25.pdf",
    uploadDate: "2024-07-20",
    uploadedBy: "Administration",
    academicYear: "2024-25",
    semester: "Full Year",
    department: "All Departments",
    fileSize: 123456,
    downloadCount: 345,
    isActive: true,
    version: 1,
    tags: ["Holidays", "Events", "Festival", "Calendar"]
  }
];

const AcademicCalendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'pdfs'>('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('2024-25');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [expandedPdf, setExpandedPdf] = useState<string | null>(null);

  const academicEvents = SAMPLE_ACADEMIC_EVENTS;
  const pdfDocuments = SAMPLE_CALENDAR_PDFS;

  // Get unique values for filters
  const courses = useMemo(() => {
    const allCourses = new Set(academicEvents.map(e => e.course).filter(Boolean));
    return Array.from(allCourses).sort();
  }, [academicEvents]);

  const departments = useMemo(() => {
    const allDepts = new Set(academicEvents.map(e => e.department).filter(Boolean));
    return Array.from(allDepts).sort();
  }, [academicEvents]);

  const filteredEvents = useMemo(() => {
    let filtered = academicEvents;

    if (selectedCourse) {
      filtered = filtered.filter(event => 
        event.course?.includes(selectedCourse) || event.course === 'All Courses'
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter(event => 
        event.department?.includes(selectedDepartment) || event.department === 'All Departments'
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (selectedStatus) {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [academicEvents, selectedCourse, selectedDepartment, selectedCategory, selectedStatus, searchTerm]);

  const filteredPDFs = useMemo(() => {
    let filtered = pdfDocuments.filter(pdf => pdf.isActive);

    if (searchTerm) {
      filtered = filtered.filter(pdf => 
        pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pdf.course?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedYear) {
      filtered = filtered.filter(pdf => pdf.academicYear === selectedYear);
    }

    if (selectedCourse && selectedCourse !== 'All Courses') {
      filtered = filtered.filter(pdf => 
        pdf.course?.includes(selectedCourse) || pdf.course === 'All Courses'
      );
    }

    return filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  }, [pdfDocuments, searchTerm, selectedYear, selectedCourse]);

  const stats = useMemo(() => {
    const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming').length;
    const ongoingEvents = filteredEvents.filter(e => e.status === 'ongoing').length;
    const completedEvents = filteredEvents.filter(e => e.status === 'completed').length;
    const examinations = filteredEvents.filter(e => e.category === 'examination').length;
    const importantEvents = filteredEvents.filter(e => e.isImportant).length;

    return {
      totalEvents: filteredEvents.length,
      upcomingEvents,
      ongoingEvents,
      completedEvents,
      examinations,
      importantEvents,
      totalPDFs: filteredPDFs.length
    };
  }, [filteredEvents, filteredPDFs]);

  const downloadPDF = useCallback((pdf: AcademicCalendarPDF) => {
    const link = document.createElement('a');
    link.href = pdf.filePath;
    link.download = pdf.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Downloaded: ${pdf.fileName}`);
  }, []);

  const exportCalendar = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/Academic_Calendar_2024-25_All_Courses.pdf';
    link.download = 'Academic_Calendar_2024-25.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCourse('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedYear('2024-25');
    setSelectedDepartment('');
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'ongoing': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 'completed': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'examination': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'instruction': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'practical': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 'project': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'result': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      case 'holiday': return 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30';
      case 'event': return 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30';
      case 'meeting': return 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'examination': return <FileText className="w-4 h-4" />;
      case 'instruction': return <BookOpen className="w-4 h-4" />;
      case 'practical': return <Activity className="w-4 h-4" />;
      case 'project': return <Briefcase className="w-4 h-4" />;
      case 'result': return <Award className="w-4 h-4" />;
      case 'holiday': return <Calendar className="w-4 h-4" />;
      case 'event': return <Star className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      default: return <CalendarDays className="w-4 h-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Academic Calendar</h1>
          <p className={styles.headerSubtitle}>
            <Calendar className="w-6 h-6" />
            Official academic schedules and important dates for all courses
          </p>
          <div className={styles.headerActions}>
            <button
              onClick={exportCalendar}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              <Download className="w-5 h-5" />
              Export Calendar
            </button>
            <button
              onClick={clearFilters}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              <RefreshCw className="w-5 h-5" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}>
              <Calendar className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.totalEvents}</div>
            <div className={styles.statLabel}>Total Events</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <Clock className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.upcomingEvents}</div>
            <div className={styles.statLabel}>Upcoming</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400`}>
              <Activity className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.ongoingEvents}</div>
            <div className={styles.statLabel}>Ongoing</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400`}>
              <FileText className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.examinations}</div>
            <div className={styles.statLabel}>Examinations</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <Star className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.importantEvents}</div>
            <div className={styles.statLabel}>Important</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400`}>
              <Archive className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.totalPDFs}</div>
            <div className={styles.statLabel}>PDF Documents</div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList}>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`${styles.tab} ${activeTab === 'calendar' ? styles.tabActive : styles.tabInactive}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </button>
            <button
              onClick={() => setActiveTab('pdfs')}
              className={`${styles.tab} ${activeTab === 'pdfs' ? styles.tabActive : styles.tabInactive}`}
            >
              <Archive className="w-4 h-4 mr-2" />
              PDF Documents ({pdfDocuments.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <h2 className={styles.filtersTitle}>
              <Filter className="w-6 h-6" />
              Filters & Search
            </h2>
            <div className={styles.filtersActions}>
              {activeTab === 'calendar' && (
                <button
                  onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  {viewMode === 'table' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                  {viewMode === 'table' ? 'Card View' : 'Table View'}
                </button>
              )}
              <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
                <X className="w-4 h-4" />
                Clear
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
                placeholder="Search events, courses, departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {activeTab === 'calendar' && (
              <>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <GraduationCap className="w-4 h-4" />
                    Course
                  </label>
                  <select
                    className={styles.select}
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">All Courses</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Building className="w-4 h-4" />
                    Department
                  </label>
                  <select
                    className={styles.select}
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Tag className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    className={styles.select}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="examination">Examinations</option>
                    <option value="instruction">Instruction</option>
                    <option value="practical">Practical</option>
                    <option value="project">Projects</option>
                    <option value="result">Results</option>
                    <option value="holiday">Holidays</option>
                    <option value="event">Events</option>
                    <option value="meeting">Meetings</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    <Activity className="w-4 h-4" />
                    Status
                  </label>
                  <select
                    className={styles.select}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </>
            )}

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Calendar className="w-4 h-4" />
                Academic Year
              </label>
              <select
                className={styles.select}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
                <option value="2025-26">2025-26</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Tab Content */}
        {activeTab === 'calendar' && (
          <>
            {/* Important Notice */}
            <div className={`${styles.alert} ${styles.alertInfo}`}>
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium mb-2">Academic Calendar Information:</div>
                  <p className="text-sm">
                    This calendar includes all important academic dates, examination schedules, holidays, and events 
                    for the current academic year. Please check regularly for updates and announcements.
                  </p>
                </div>
              </div>
            </div>

            {viewMode === 'table' ? (
              /* Table View */
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <Calendar className="w-6 h-6" />
                  Academic Events Schedule
                </h2>

                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                      <tr>
                        <th className={styles.tableHeaderCell}>Event</th>
                        {/* <th className={styles.tableHeaderCell}>Course/Department</th> */}
                        <th className={styles.tableHeaderCell}>Start Date</th>
                        <th className={styles.tableHeaderCell}>End Date</th>
                        <th className={styles.tableHeaderCell}>Duration</th>
                        <th className={styles.tableHeaderCell}>Category</th>
                        <th className={styles.tableHeaderCell}>Status</th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                      {filteredEvents.map((event) => (
                        <tr key={event.id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                                {event.title}
                                {event.isImportant && (
                                  <Star className="w-4 h-4 text-amber-500 inline ml-2" />
                                )}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {event.description}
                              </div>
                            </div>
                          </td>
                          <td className={styles.tableCell}>
                            <div className="space-y-1">
                              {event.course && (
                                <span className={`${styles.tag} ${styles.tagPrimary}`}>
                                  {event.course}
                                </span>
                              )}
                              {event.department && (
                                <span className={`${styles.tag} ${styles.tagDefault}`}>
                                  {event.department}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className={styles.tableCell}>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {formatDate(event.startDate)}
                            </div>
                          </td>
                          <td className={styles.tableCell}>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {formatDate(event.endDate)}
                            </div>
                          </td>
                          <td className={styles.tableCell}>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {event.duration}
                            </div>
                          </td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.tag} px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                              <span className="flex items-center gap-1">
                                {getCategoryIcon(event.category)}
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                              </span>
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.tag} px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredEvents.length === 0 && (
                    <div className={styles.empty}>
                      <Calendar className={styles.emptyIcon} />
                      <h3 className={styles.emptyTitle}>No Events Found</h3>
                      <p className={styles.emptyText}>
                        No academic events match your current filter criteria.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Card View */
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <Calendar className="w-6 h-6" />
                  Academic Events Schedule
                </h2>

                {filteredEvents.length === 0 ? (
                  <div className={styles.empty}>
                    <Calendar className={styles.emptyIcon} />
                    <h3 className={styles.emptyTitle}>No Events Found</h3>
                    <p className={styles.emptyText}>
                      No academic events match your current filter criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                              {getCategoryIcon(event.category)}
                              {event.title}
                              {event.isImportant && (
                                <Star className="w-4 h-4 text-amber-500" />
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {event.description}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {(event.course || event.department) && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Applies to:</span>
                              <div className="flex gap-2">
                                {event.course && (
                                  <span className={`${styles.tag} ${styles.tagPrimary}`}>
                                    {event.course}
                                  </span>
                                )}
                                {event.department && (
                                  <span className={`${styles.tag} ${styles.tagDefault}`}>
                                    {event.department}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.duration}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Date Range:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {formatDate(event.startDate)} - {formatDate(event.endDate)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className={`${styles.tag} px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </span>
                            <span className={`${styles.tag} px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* PDF Documents Tab Content */}
        {activeTab === 'pdfs' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Archive className="w-6 h-6" />
              Academic Calendar Documents
            </h2>

            {filteredPDFs.length === 0 ? (
              <div className={styles.empty}>
                <Archive className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No Documents Found</h3>
                <p className={styles.emptyText}>
                  No PDF documents match your current search criteria.
                </p>
              </div>
            ) : (
              <div className={styles.pdfGrid}>
                {filteredPDFs.map((pdf) => {
                  const isExpanded = expandedPdf === pdf.id;
                  
                  return (
                    <div key={pdf.id} className={styles.pdfCard}>
                      <div className={styles.pdfHeader}>
                        <div className={styles.pdfIcon}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className={styles.pdfInfo}>
                          <h3 className={styles.pdfTitle}>{pdf.title}</h3>
                          <div className={styles.pdfMeta}>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Uploaded: {formatDate(pdf.uploadDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{pdf.uploadedBy}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Archive className="w-4 h-4" />
                              <span>{formatFileSize(pdf.fileSize)} • v{pdf.version}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {pdf.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {pdf.tags.map((tag) => (
                            <span key={tag} className={`${styles.tag} ${styles.tagDefault}`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Academic Year:</span>
                            <div className="font-medium">{pdf.academicYear}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Course:</span>
                            <div className="font-medium">{pdf.course}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Downloads:</span>
                            <div className="font-medium flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              {pdf.downloadCount}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Department:</span>
                            <div className="font-medium">{pdf.department}</div>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                            Additional Information
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <div>File Name: {pdf.fileName}</div>
                            <div>Status: {pdf.isActive ? 'Active' : 'Inactive'}</div>
                            <div>Version: {pdf.version}</div>
                            <div>Semester: {pdf.semester}</div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => setExpandedPdf(isExpanded ? null : pdf.id)}
                          className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                        >
                          <Eye className="w-4 h-4" />
                          {isExpanded ? 'Show Less' : 'View Details'}
                        </button>
                        <button
                          onClick={() => downloadPDF(pdf)}
                          className={`${styles.button} ${styles.buttonPrimary} flex-1`}
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Footer Information */}
        <div className={styles.section}>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              For any queries regarding the academic calendar, please contact the Academic Office or your respective department.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Academic Calendar 2024-25 | Updated regularly by the Administration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
