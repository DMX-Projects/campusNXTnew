import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  TrendingUpIcon,
  UserIcon,
  MessageSquareIcon,
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  StarIcon,
  ArrowUpIcon,
  MinusIcon,
  ArrowDownIcon,
  EyeIcon,
  DownloadIcon,
  BookOpenIcon,
  TestTubeIcon,
  RefreshCwIcon,
  BellIcon,
  SettingsIcon,
  PlusIcon,
  XIcon,
  FilterIcon,
  SearchIcon,
  TargetIcon,
  ZapIcon,
  AwardIcon,
  TrendingDownIcon,
  BarChart3Icon,
  PieChartIcon,
  LineChartIcon,
  MapPinIcon,
  BuildingIcon,
  GraduationCapIcon,
  PhoneIcon,
  MailIcon,
  LinkIcon,
  ShareIcon,
  EditIcon,
  TrashIcon,
  HeartIcon,
  BookmarkIcon,
  FlagIcon,
  InfoIcon,
  HelpCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  MaximizeIcon,
  MinimizeIcon
} from 'lucide-react';

interface PlacementStats {
  totalApplications: number;
  interviewsScheduled: number;
  offersReceived: number;
  placementPercentage: number;
  averagePackage: number;
  highestPackage: number;
  companiesVisited: number;
  upcomingInterviews: number;
  rejections: number;
  pending: number;
  successRate: number;
  responseRate: number;
  profileViews: number;
  goalProgress: number;
}

interface RecentActivity {
  id: string;
  type: 'application' | 'interview' | 'offer' | 'rejection' | 'update' | 'test' | 'profile';
  company: string;
  position?: string;
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
  actionRequired?: boolean;
  actionText?: string;
  isRead?: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface UpcomingEvent {
  id: string;
  title: string;
  company: string;
  type: 'interview' | 'drive' | 'webinar' | 'deadline' | 'test' | 'meeting';
  date: string;
  time: string;
  venue: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  reminder?: boolean;
  attendees?: number;
  preparation?: string[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  category: 'applications' | 'interviews' | 'offers' | 'skills' | 'tests';
  status: 'on-track' | 'behind' | 'completed' | 'at-risk';
}

interface Company {
  id: string;
  name: string;
  logo: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  appliedDate: string;
  position: string;
  package?: number;
  location: string;
  applicationId: string;
  nextStep?: string;
  notes?: string;
  isBookmarked: boolean;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }>;
}

const StudentPlacementDashboard: React.FC = () => {
  // State Management
  const [stats, setStats] = useState<PlacementStats>({
    totalApplications: 18,
    interviewsScheduled: 7,
    offersReceived: 3,
    placementPercentage: 82.4,
    averagePackage: 12.5,
    highestPackage: 28.0,
    companiesVisited: 52,
    upcomingInterviews: 4,
    rejections: 6,
    pending: 9,
    successRate: 38.9,
    responseRate: 67.3,
    profileViews: 234,
    goalProgress: 74
  });

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Job Applications',
      description: 'Apply to target companies',
      targetValue: 25,
      currentValue: 18,
      unit: 'applications',
      deadline: '2025-12-31',
      category: 'applications',
      status: 'on-track'
    },
    {
      id: '2',
      title: 'Interview Success',
      description: 'Clear technical interviews',
      targetValue: 10,
      currentValue: 7,
      unit: 'interviews',
      deadline: '2025-11-30',
      category: 'interviews',
      status: 'on-track'
    },
    {
      id: '3',
      title: 'Job Offers',
      description: 'Secure multiple offers',
      targetValue: 3,
      currentValue: 3,
      unit: 'offers',
      deadline: '2025-10-31',
      category: 'offers',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Skill Certifications',
      description: 'Complete relevant certifications',
      targetValue: 5,
      currentValue: 2,
      unit: 'certificates',
      deadline: '2025-09-30',
      category: 'skills',
      status: 'behind'
    }
  ]);

  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'Google',
      logo: '🔍',
      status: 'offer',
      appliedDate: '2025-03-15',
      position: 'Software Engineer',
      package: 2800000,
      location: 'Bangalore',
      applicationId: 'GOOG-2025-001',
      nextStep: 'Package negotiation',
      isBookmarked: true
    },
    {
      id: '2',
      name: 'Microsoft',
      logo: '🪟',
      status: 'interview',
      appliedDate: '2025-03-10',
      position: 'SDE-2',
      location: 'Hyderabad',
      applicationId: 'MSFT-2025-002',
      nextStep: 'Final round on Sep 5',
      isBookmarked: true
    },
    {
      id: '3',
      name: 'Amazon',
      logo: '📦',
      status: 'screening',
      appliedDate: '2025-03-20',
      position: 'SDE-1',
      location: 'Bangalore',
      applicationId: 'AMZN-2025-003',
      nextStep: 'Online assessment pending',
      isBookmarked: false
    },
    {
      id: '4',
      name: 'Meta',
      logo: '👥',
      status: 'applied',
      appliedDate: '2025-03-25',
      position: 'Frontend Engineer',
      location: 'Remote',
      applicationId: 'META-2025-004',
      nextStep: 'Resume screening',
      isBookmarked: false
    },
    {
      id: '5',
      name: 'Apple',
      logo: '🍎',
      status: 'rejected',
      appliedDate: '2025-02-28',
      position: 'iOS Developer',
      location: 'Bangalore',
      applicationId: 'AAPL-2025-005',
      notes: 'Rejected after technical round',
      isBookmarked: false
    }
  ]);

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'offer',
      company: 'Google',
      position: 'Software Engineer',
      message: 'Congratulations! You have received a job offer with ₹28L package',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'success',
      actionRequired: true,
      actionText: 'Review Offer',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'interview',
      company: 'Microsoft',
      position: 'SDE-2',
      message: 'Final round interview scheduled for tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      status: 'warning',
      actionRequired: true,
      actionText: 'Prepare',
      isRead: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'test',
      company: 'Amazon',
      message: 'Online assessment completed successfully. Score: 87/100',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'success',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'rejection',
      company: 'Apple',
      position: 'iOS Developer',
      message: 'Application not selected for next round. Keep improving!',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'error',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'profile',
      company: 'LinkedIn',
      message: 'Your profile was viewed by 15 recruiters this week',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'info',
      isRead: true,
      priority: 'low'
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([
    {
      id: '1',
      title: 'Final Round Interview',
      company: 'Google',
      type: 'interview',
      date: '2025-09-04',
      time: '14:00',
      venue: 'Google Meet',
      description: 'System design and behavioral interview with engineering manager',
      priority: 'high',
      reminder: true,
      preparation: ['System Design', 'Behavioral Questions', 'Company Research']
    },
    {
      id: '2',
      title: 'Microsoft Campus Drive',
      company: 'Microsoft',
      type: 'drive',
      date: '2025-09-05',
      time: '09:00',
      venue: 'Main Auditorium',
      description: 'Campus recruitment for multiple roles including SDE, PM, and Data Scientist',
      priority: 'high',
      attendees: 150,
      preparation: ['Resume', 'Coding Practice', 'Technical Questions']
    },
    {
      id: '3',
      title: 'Amazon Online Assessment',
      company: 'Amazon',
      type: 'test',
      date: '2025-09-06',
      time: '10:00',
      venue: 'Online Portal',
      description: 'Coding assessment and work simulation',
      priority: 'medium',
      preparation: ['Data Structures & Algorithms', 'Time Management']
    },
    {
      id: '4',
      title: 'Tesla Application Deadline',
      company: 'Tesla',
      type: 'deadline',
      date: '2025-09-07',
      time: '23:59',
      venue: 'Company Portal',
      description: 'Last date to apply for Software Engineer position',
      priority: 'medium'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Offer Letter Received',
      message: 'Google has sent your offer letter. Action required within 3 days.',
      type: 'success',
      timestamp: '30 minutes ago',
      actionRequired: true
    },
    {
      id: '2',
      title: 'Interview Reminder',
      message: 'Microsoft final round interview in 18 hours. Good luck!',
      type: 'warning',
      timestamp: '2 hours ago',
      actionRequired: true
    },
    {
      id: '3',
      title: 'New Company Registration',
      message: 'Netflix has registered for campus placements. Applications open soon.',
      type: 'info',
      timestamp: '5 hours ago',
      actionRequired: false
    },
    {
      id: '4',
      title: 'Profile Update Needed',
      message: 'Complete your skills section to improve visibility to recruiters.',
      type: 'warning',
      timestamp: '1 day ago',
      actionRequired: true
    }
  ]);

  // Component state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showActivityDetails, setShowActivityDetails] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<RecentActivity | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeChart, setActiveChart] = useState<'applications' | 'interviews' | 'packages'>('applications');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Toast notification system
  const showToast = useCallback((type: Toast['type'], title: string, message: string, duration = 5000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, title, message, duration };
    setToasts(prev => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Chart data generation
  const chartData = useMemo(() => {
    const applicationTrend: ChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [{
        label: 'Applications',
        data: [2, 4, 3, 5, 8, 6, 9, 12, 18],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2
      }]
    };

    const interviewSuccess = {
      labels: ['Technical', 'HR', 'System Design', 'Behavioral', 'Final'],
      datasets: [{
        label: 'Success Rate',
        data: [85, 78, 92, 88, 75],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }]
    };

    const packageDistribution = {
      labels: ['0-5L', '5-10L', '10-15L', '15-20L', '20L+'],
      datasets: [{
        label: 'Offers',
        data: [0, 0, 1, 1, 1],
        backgroundColor: [
          'rgba(156, 163, 175, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }]
    };

    return { applicationTrend, interviewSuccess, packageDistribution };
  }, []);

  // Event handlers
  const handleRefreshDashboard = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalApplications: prev.totalApplications + Math.floor(Math.random() * 2),
        profileViews: prev.profileViews + Math.floor(Math.random() * 10),
        goalProgress: Math.min(100, prev.goalProgress + Math.floor(Math.random() * 5))
      }));
      
      setIsLoading(false);
      showToast('success', 'Dashboard Updated', 'Latest data has been loaded successfully');
    }, 2000);
  }, [showToast]);

  const handleExportReport = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const reportData = {
        timestamp: new Date().toISOString(),
        stats,
        goals,
        companies: companies.length,
        activities: recentActivities.length
      };
      
      const dataStr = JSON.stringify(reportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `Placement_Dashboard_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setIsLoading(false);
      showToast('success', 'Report Exported', 'Your placement report has been downloaded');
    }, 1500);
  }, [stats, goals, companies, recentActivities, showToast]);

  const handleQuickAction = useCallback((actionType: string) => {
    switch (actionType) {
      case 'resume':
        showToast('info', 'Opening Resume Manager', 'Redirecting to resume management section...');
        break;
      case 'companies':
        showToast('info', 'Browse Companies', 'Loading available job opportunities...');
        break;
      case 'tests':
        showToast('info', 'Practice Tests', 'Opening mock interview and aptitude test section...');
        break;
      case 'materials':
        showToast('info', 'Study Materials', 'Loading preparation guides and resources...');
        break;
      case 'calendar':
        showToast('info', 'Calendar View', 'Opening full calendar with all events...');
        break;
      case 'inbox':
        showToast('info', 'Placement Inbox', 'Loading all placement-related communications...');
        break;
      case 'notifications':
        showToast('info', 'All Notifications', 'Opening complete notification center...');
        break;
      case 'profile':
        showToast('info', 'Profile Editor', 'Opening profile completion interface...');
        break;
      default:
        showToast('info', 'Feature', 'This feature will be available soon');
    }
  }, [showToast]);

  const handleActivityAction = useCallback((activity: RecentActivity) => {
    if (activity.actionRequired) {
      setSelectedActivity(activity);
      setShowActivityDetails(true);
      
      // Mark as read
      setRecentActivities(prev => prev.map(a => 
        a.id === activity.id ? { ...a, isRead: true } : a
      ));
    }
  }, []);

  const handleEventAction = useCallback((event: UpcomingEvent, action: 'view' | 'remind' | 'prepare') => {
    switch (action) {
      case 'view':
        setSelectedEvent(event);
        setShowEventModal(true);
        break;
      case 'remind':
        setUpcomingEvents(prev => prev.map(e => 
          e.id === event.id ? { ...e, reminder: !e.reminder } : e
        ));
        showToast('success', 'Reminder Updated', 
          `Reminder ${event.reminder ? 'disabled' : 'enabled'} for ${event.title}`);
        break;
      case 'prepare':
        showToast('info', 'Preparation Mode', `Opening preparation materials for ${event.title}`);
        break;
    }
  }, [showToast]);

  const handleCompanyAction = useCallback((company: Company, action: 'view' | 'bookmark' | 'contact' | 'update') => {
    switch (action) {
      case 'view':
        setSelectedCompany(company);
        setShowCompanyModal(true);
        break;
      case 'bookmark':
        setCompanies(prev => prev.map(c => 
          c.id === company.id ? { ...c, isBookmarked: !c.isBookmarked } : c
        ));
        showToast('success', 'Bookmark Updated', 
          `${company.name} ${company.isBookmarked ? 'removed from' : 'added to'} bookmarks`);
        break;
      case 'contact':
        showToast('info', 'Opening Contact', `Loading contact information for ${company.name}`);
        break;
      case 'update':
        showToast('info', 'Update Application', `Opening application update form for ${company.name}`);
        break;
    }
  }, [showToast]);

  const handleGoalUpdate = useCallback((goalId: string, increment: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newValue = Math.min(goal.targetValue, Math.max(0, goal.currentValue + increment));
        let status: Goal['status'] = 'on-track';
        
        if (newValue >= goal.targetValue) {
          status = 'completed';
        } else {
          const progress = (newValue / goal.targetValue) * 100;
          const timeProgress = (new Date().getTime() - new Date('2025-01-01').getTime()) / 
                             (new Date(goal.deadline).getTime() - new Date('2025-01-01').getTime()) * 100;
          
          if (progress < timeProgress - 20) {
            status = 'behind';
          } else if (progress < timeProgress - 10) {
            status = 'at-risk';
          }
        }
        
        return { ...goal, currentValue: newValue, status };
      }
      return goal;
    }));
    
    showToast('success', 'Goal Updated', 'Your progress has been recorded');
  }, [showToast]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('success', 'Notifications Updated', 'All notifications marked as read');
  }, [showToast]);

  // Utility functions
  const getActivityIcon = (type: string) => {
    const icons = {
      application: BriefcaseIcon,
      interview: UserIcon,
      offer: CheckCircleIcon,
      rejection: AlertCircleIcon,
      update: MessageSquareIcon,
      test: TestTubeIcon,
      profile: UserIcon
    };
    return icons[type as keyof typeof icons] || MessageSquareIcon;
  };

  const getActivityColor = (status: string) => {
    const colors = {
      success: 'text-green-600 bg-green-100 border-green-200',
      warning: 'text-yellow-600 bg-yellow-100 border-yellow-200',
      error: 'text-red-600 bg-red-100 border-red-200',
      info: 'text-blue-600 bg-blue-100 border-blue-200'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100 border-gray-200';
  };

  const getEventIcon = (type: string) => {
    const icons = {
      interview: UserIcon,
      drive: BriefcaseIcon,
      webinar: BookOpenIcon,
      deadline: ClockIcon,
      test: TestTubeIcon,
      meeting: CalendarIcon
    };
    return icons[type as keyof typeof icons] || CalendarIcon;
  };

  const getGoalStatusColor = (status: string) => {
    const colors = {
      'completed': 'text-green-600 bg-green-100 border-green-200',
      'on-track': 'text-blue-600 bg-blue-100 border-blue-200',
      'at-risk': 'text-yellow-600 bg-yellow-100 border-yellow-200',
      'behind': 'text-red-600 bg-red-100 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100 border-gray-200';
  };

  const getCompanyStatusColor = (status: string) => {
    const colors = {
      applied: 'text-blue-600 bg-blue-100',
      screening: 'text-yellow-600 bg-yellow-100',
      interview: 'text-purple-600 bg-purple-100',
      offer: 'text-green-600 bg-green-100',
      rejected: 'text-red-600 bg-red-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const isEventToday = (date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  };

  const isEventTomorrow = (date: string) => {
    const eventDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return eventDate.toDateString() === tomorrow.toDateString();
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadActivities = recentActivities.filter(a => !a.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all transform animate-slide-in ${
                toast.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                toast.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                toast.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium text-sm">{toast.title}</div>
                <div className="text-xs mt-1">{toast.message}</div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 backdrop-blur-sm bg-white/90">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  P
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Placement Dashboard</h1>
                  <p className="text-gray-600">Welcome back! Here's your placement journey overview</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Last updated: {currentTime.toLocaleString()}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live updates enabled
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                {/* <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                >
                  <BellIcon size={20} />
                  <span className="hidden sm:inline">Notifications</span>
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {unreadNotifications}
                    </span>
                  )}
                </button> */}
                
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Mark all read
                        </button>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {notifications.slice(0, 5).map(notification => (
                        <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={`p-1 rounded-full ${
                              notification.type === 'success' ? 'bg-green-100 text-green-600' :
                              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                              notification.type === 'error' ? 'bg-red-100 text-red-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <BellIcon size={12} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-gray-900">{notification.title}</h4>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">{notification.timestamp}</span>
                                {notification.actionRequired && (
                                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                    Take Action
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          handleQuickAction('notifications');
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleRefreshDashboard}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <RefreshCwIcon size={20} className={isLoading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">{isLoading ? 'Updating...' : 'Refresh'}</span>
              </button>
              
              <button
                onClick={handleExportReport}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <DownloadIcon size={20} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Enhanced Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Applications</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-blue-900">{stats.totalApplications}</p>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUpIcon size={12} />
                      <span>+12%</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700">{stats.pending} pending responses</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-lg">
                  <BriefcaseIcon className="text-white" size={24} />
                </div>
              </div>
              <div className="mt-3 w-full bg-blue-200 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${(stats.totalApplications / 25) * 100}%` }}></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Interviews</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-yellow-900">{stats.interviewsScheduled}</p>
                    <div className="text-xs text-yellow-800 bg-yellow-200 px-2 py-1 rounded-full">
                      {stats.upcomingInterviews} upcoming
                    </div>
                  </div>
                  <p className="text-xs text-yellow-700">Success rate: {stats.successRate}%</p>
                </div>
                <div className="bg-yellow-600 p-3 rounded-lg">
                  <UserIcon className="text-white" size={24} />
                </div>
              </div>
              <div className="mt-3 w-full bg-yellow-200 rounded-full h-1">
                <div className="bg-yellow-600 h-1 rounded-full" style={{ width: `${stats.successRate}%` }}></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Offers</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-green-900">{stats.offersReceived}</p>
                    <div className="flex items-center text-xs text-green-600">
                      <CheckCircleIcon size={12} />
                      <span>Active</span>
                    </div>
                  </div>
                  <p className="text-xs text-green-700">Best: ₹{stats.highestPackage}L</p>
                </div>
                <div className="bg-green-600 p-3 rounded-lg">
                  <AwardIcon className="text-white" size={24} />
                </div>
              </div>
              <div className="mt-3 w-full bg-green-200 rounded-full h-1">
                <div className="bg-green-600 h-1 rounded-full w-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Goal Progress</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-purple-900">{stats.goalProgress}%</p>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUpIcon size={12} />
                      <span>On track</span>
                    </div>
                  </div>
                  <p className="text-xs text-purple-700">{stats.profileViews} profile views</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-lg">
                  <TargetIcon className="text-white" size={24} />
                </div>
              </div>
              <div className="mt-3 w-full bg-purple-200 rounded-full h-1">
                <div className="bg-purple-600 h-1 rounded-full" style={{ width: `${stats.goalProgress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Quick Goals Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {goals.map(goal => (
              <div key={goal.id} className="bg-gray-50 p-4 rounded-lg border hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{goal.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getGoalStatusColor(goal.status)}`}>
                    {goal.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">{goal.currentValue}</span>
                  <span className="text-sm text-gray-600">/ {goal.targetValue} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      goal.status === 'completed' ? 'bg-green-500' :
                      goal.status === 'on-track' ? 'bg-blue-500' :
                      goal.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(goal.currentValue / goal.targetValue) * 100}%` }}
                  ></div>
                </div>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => handleGoalUpdate(goal.id, -1)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded transition-colors"
                    disabled={goal.currentValue <= 0}
                  >
                    <MinusIcon size={12} />
                  </button>
                  <button
                    onClick={() => handleGoalUpdate(goal.id, 1)}
                    className="bg-green-100 hover:bg-green-200 text-green-600 p-1 rounded transition-colors"
                    disabled={goal.currentValue >= goal.targetValue}
                  >
                    <PlusIcon size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Charts Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>
                <div className="flex items-center gap-2">
                  <select
                    value={activeChart}
                    onChange={(e) => setActiveChart(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="applications">Application Trend</option>
                    <option value="interviews">Interview Success</option>
                    <option value="packages">Package Distribution</option>
                  </select>
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                </div>
              </div>
              
              <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                {activeChart === 'applications' && (
                  <div className="text-center">
                    <LineChartIcon size={48} className="text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Application Trend</h3>
                    <p className="text-sm text-gray-600">📈 Steady growth with 18 applications submitted</p>
                    <div className="mt-4 flex justify-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">+12%</div>
                        <div className="text-xs text-gray-600">vs last month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">67%</div>
                        <div className="text-xs text-gray-600">response rate</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeChart === 'interviews' && (
                  <div className="text-center">
                    <PieChartIcon size={48} className="text-purple-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Interview Success Rate</h3>
                    <p className="text-sm text-gray-600">🎯 Strong performance across all rounds</p>
                    <div className="mt-4 flex justify-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">85%</div>
                        <div className="text-xs text-gray-600">Technical</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">92%</div>
                        <div className="text-xs text-gray-600">System Design</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">88%</div>
                        <div className="text-xs text-gray-600">Behavioral</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeChart === 'packages' && (
                  <div className="text-center">
                    <BarChart3Icon size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Package Distribution</h3>
                    <p className="text-sm text-gray-600">💰 Excellent offers received across ranges</p>
                    <div className="mt-4 flex justify-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">₹28L</div>
                        <div className="text-xs text-gray-600">Highest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">₹18L</div>
                        <div className="text-xs text-gray-600">Average</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">3</div>
                        <div className="text-xs text-gray-600">Offers</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <span className="text-sm text-gray-500">Get things done faster</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'resume', title: 'Update Resume', description: 'Edit and improve your resume', icon: FileTextIcon, color: 'bg-blue-500', action: () => handleQuickAction('resume') },
                  { id: 'companies', title: 'Browse Companies', description: 'Explore job opportunities', icon: BriefcaseIcon, color: 'bg-green-500', action: () => handleQuickAction('companies') },
                  { id: 'tests', title: 'Practice Tests', description: 'Mock interviews & tests', icon: TestTubeIcon, color: 'bg-purple-500', action: () => handleQuickAction('tests') },
                  { id: 'materials', title: 'Prep Materials', description: 'Study guides & resources', icon: BookOpenIcon, color: 'bg-orange-500', action: () => handleQuickAction('materials') }
                ].map(action => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="p-4 rounded-xl border border-gray-200 hover:shadow-lg hover:scale-105 transition-all group bg-gradient-to-br from-white to-gray-50"
                    >
                      <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                        <IconComponent className="text-white" size={20} />
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{action.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{action.description}</p>
                    </button>
                  );
                })}
              </div>
            </div> */}

            {/* Enhanced Company Applications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{companies.length} companies</span>
                  <button
                    onClick={() => handleQuickAction('companies')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {companies.slice(0, 5).map(company => (
                  <div key={company.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50">
                    <div className="text-2xl">{company.logo}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{company.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompanyStatusColor(company.status)}`}>
                          {company.status.replace('-', ' ').toUpperCase()}
                        </span>
                        {company.isBookmarked && (
                          <HeartIcon size={14} className="text-red-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{company.position}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarIcon size={12} />
                          Applied: {new Date(company.appliedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPinIcon size={12} />
                          {company.location}
                        </span>
                        {company.package && (
                          <span className="text-green-600 font-medium">
                            ₹{(company.package / 100000).toFixed(1)}L
                          </span>
                        )}
                      </div>
                      {company.nextStep && (
                        <p className="text-xs text-blue-600 mt-1 font-medium">
                          Next: {company.nextStep}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleCompanyAction(company, 'view')}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <EyeIcon size={14} />
                      </button>
                      <button
                        onClick={() => handleCompanyAction(company, 'bookmark')}
                        className={`p-2 rounded-lg transition-colors ${
                          company.isBookmarked 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                        }`}
                        title="Bookmark"
                      >
                        <HeartIcon size={14} fill={company.isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                {/* <button 
                  onClick={() => handleQuickAction('calendar')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Calendar
                </button> */}
              </div>
              <div className="space-y-4">
                {upcomingEvents.slice(0, 4).map(event => {
                  const IconComponent = getEventIcon(event.type);
                  const isToday = isEventToday(event.date);
                  const isTomorrow = isEventTomorrow(event.date);
                  
                  return (
                    <div key={event.id} className={`border rounded-xl p-4 transition-all hover:shadow-md ${
                      isToday ? 'border-red-200 bg-gradient-to-r from-red-50 to-red-100' : 
                      isTomorrow ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100' : 
                      'border-gray-200 bg-gradient-to-r from-white to-gray-50'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl shadow-sm ${
                          isToday ? 'bg-red-100 text-red-600' :
                          isTomorrow ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <IconComponent size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900">{event.title}</h3>
                            <div className="flex items-center gap-2">
                              {isToday && (
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                                  Today
                                </span>
                              )}
                              {isTomorrow && (
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                  Tomorrow
                                </span>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.priority === 'high' ? 'bg-red-100 text-red-800' :
                                event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {event.priority} priority
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{event.company}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <CalendarIcon size={12} />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <ClockIcon size={12} />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPinIcon size={12} />
                              {event.venue}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{event.description}</p>
                          
                          {event.preparation && event.preparation.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs font-medium text-gray-700 mb-1">Preparation needed:</p>
                              <div className="flex flex-wrap gap-1">
                                {event.preparation.slice(0, 3).map((prep, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                    {prep}
                                  </span>
                                ))}
                                {event.preparation.length > 3 && (
                                  <span className="text-xs text-gray-500">+{event.preparation.length - 3} more</span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEventAction(event, 'view')}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg text-xs transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleEventAction(event, 'remind')}
                              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                                event.reminder 
                                  ? 'bg-yellow-200 text-yellow-800' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                              }`}
                            >
                              {event.reminder ? 'Reminder On' : 'Set Reminder'}
                            </button>
                            {/* {event.preparation && (
                              <button
                                onClick={() => handleEventAction(event, 'prepare')}
                                className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-lg text-xs transition-colors"
                              >
                                Prepare
                              </button>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Recent Activities */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <div className="flex items-center gap-2">
                  {unreadActivities > 0 && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      {unreadActivities} new
                    </span>
                  )}
                  <button 
                    onClick={() => handleQuickAction('inbox')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {recentActivities.slice(0, 6).map(activity => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div 
                      key={activity.id} 
                      className={`flex items-start gap-3 p-4 rounded-xl transition-all cursor-pointer hover:shadow-md ${
                        !activity.isRead ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleActivityAction(activity)}
                    >
                      <div className={`p-2 rounded-full border ${getActivityColor(activity.status)}`}>
                        <IconComponent size={14} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">{activity.company}</p>
                              {activity.position && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <p className="text-xs text-gray-600">{activity.position}</p>
                                </>
                              )}
                              {activity.priority === 'high' && (
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                  High Priority
                                </span>
                              )}
                            </div>
                            {!activity.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.message}</p>
                        {activity.actionRequired && activity.actionText && (
                          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors">
                            {activity.actionText}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon size={16} className="text-green-600" />
                    <span className="text-sm text-gray-700">Response Rate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-green-900">{stats.responseRate}%</span>
                    <ArrowUpIcon size={14} className="text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <UserIcon size={16} className="text-blue-600" />
                    <span className="text-sm text-gray-700">Interview Success</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-blue-900">{stats.successRate}%</span>
                    <ArrowUpIcon size={14} className="text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <EyeIcon size={16} className="text-purple-600" />
                    <span className="text-sm text-gray-700">Profile Views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-purple-900">{stats.profileViews}</span>
                    <ArrowUpIcon size={14} className="text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AwardIcon size={16} className="text-yellow-600" />
                    <span className="text-sm text-gray-700">Avg Package</span>
                  </div>
                  <span className="font-semibold text-yellow-900">₹{stats.averagePackage}L</span>
                </div>
              </div>
            </div>

            {/* Enhanced Goals Tracker */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Goals Tracker</h3>
                {/* <button
                  onClick={() => setShowGoalModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Manage Goals
                </button> */}
              </div>
              <div className="space-y-4">
                {goals.slice(0, 3).map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{goal.currentValue}/{goal.targetValue}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getGoalStatusColor(goal.status)}`}>
                          {goal.status === 'on-track' ? '✓' : 
                           goal.status === 'completed' ? '🎉' :
                           goal.status === 'at-risk' ? '⚠️' : '⚡'}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          goal.status === 'completed' ? 'bg-green-500' :
                          goal.status === 'on-track' ? 'bg-blue-500' :
                          goal.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (goal.currentValue / goal.targetValue) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{goal.category}</span>
                      <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Recommendations */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-purple-600 text-white p-2 rounded-lg">
                  <ZapIcon size={16} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Study Recommendations</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Complete system design mock interview before Google final round
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ClockIcon size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Practice behavioral questions for Microsoft interview
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <TargetIcon size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Update LinkedIn profile to attract more recruiters
                  </p>
                </div>
              </div>
              
              {/* <button
                onClick={() => handleQuickAction('materials')}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
              >
                View Study Plan
              </button> */}
            </div>
          </div>
        </div>

        {/* Activity Details Modal */}
        {showActivityDetails && selectedActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Activity Details</h2>
                <button
                  onClick={() => setShowActivityDetails(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏢</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedActivity.company}</h3>
                    {selectedActivity.position && (
                      <p className="text-sm text-gray-600">{selectedActivity.position}</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedActivity.message}</p>
                </div>
                
                <div className="text-sm text-gray-500">
                  {formatTimeAgo(selectedActivity.timestamp)}
                </div>
                
                {selectedActivity.actionRequired && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        showToast('success', 'Action Taken', `Proceeding with ${selectedActivity.actionText}`);
                        setShowActivityDetails(false);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      {selectedActivity.actionText}
                    </button>
                    <button
                      onClick={() => setShowActivityDetails(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      Later
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Event Details Modal */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Company</div>
                    <div className="text-lg font-semibold text-blue-900">{selectedEvent.company}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Date & Time</div>
                    <div className="text-lg font-semibold text-green-900">
                      {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Venue</h3>
                  <p className="text-gray-700">{selectedEvent.venue}</p>
                </div>
                
                {selectedEvent.preparation && selectedEvent.preparation.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Preparation Needed</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.preparation.map((prep, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {prep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedEvent.attendees && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expected Attendees</h3>
                    <p className="text-gray-700">{selectedEvent.attendees} students</p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      showToast('success', 'Added to Calendar', `${selectedEvent.title} added to your calendar`);
                      setShowEventModal(false);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Add to Calendar
                  </button>
                  <button
                    onClick={() => handleEventAction(selectedEvent, 'remind')}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {selectedEvent.reminder ? 'Remove Reminder' : 'Set Reminder'}
                  </button>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Company Details Modal */}
        {showCompanyModal && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedCompany.logo}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedCompany.name}</h2>
                    <p className="text-gray-600">{selectedCompany.position}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCompanyModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Status</div>
                    <div className={`text-lg font-semibold ${getCompanyStatusColor(selectedCompany.status).replace('bg-', 'text-').replace('-100', '-900')}`}>
                      {selectedCompany.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Applied Date</div>
                    <div className="text-lg font-semibold text-green-900">
                      {new Date(selectedCompany.appliedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Application Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Application ID:</span>
                      <span className="font-medium">{selectedCompany.applicationId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedCompany.location}</span>
                    </div>
                    {selectedCompany.package && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package:</span>
                        <span className="font-bold text-green-600">₹{(selectedCompany.package / 100000).toFixed(1)}L</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedCompany.nextStep && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
                    <p className="text-blue-600 font-medium">{selectedCompany.nextStep}</p>
                  </div>
                )}
                
                {selectedCompany.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedCompany.notes}</p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCompanyAction(selectedCompany, 'update')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => handleCompanyAction(selectedCompany, 'contact')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Contact HR
                  </button>
                  <button
                    onClick={() => setShowCompanyModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <RefreshCwIcon size={24} className="animate-spin text-blue-600" />
                <span className="text-gray-900 font-medium">Updating dashboard...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default StudentPlacementDashboard;
