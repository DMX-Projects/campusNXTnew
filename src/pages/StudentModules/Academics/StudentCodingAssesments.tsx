import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Play,
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  BookOpen,
  User,
  Star,
  Timer,
  Award,
  Terminal,
  Cpu,
  Zap,
  Bell
} from 'lucide-react';

interface CodingAssessment {
  id: string;
  title: string;
  description: string;
  subject: string;
  faculty: string;
  scheduledDate: string;
  duration: number; // in minutes
  totalProblems: number;
  totalMarks: number;
  status: 'upcoming' | 'live' | 'completed' | 'missed';
  attemptDate?: string;
  obtainedMarks?: number;
  solvedProblems?: number;
  timeSpent?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string[];
  problemTypes: string[];
  attempts: number;
  maxAttempts: number;
}

const StudentCodingAssessments: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [activeTab, setActiveTab] = useState<'assigned' | 'completed'>('assigned');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [selectedAssessment, setSelectedAssessment] = useState<CodingAssessment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Sample coding assessments data
  const [assessments] = useState<CodingAssessment[]>([
  {
      id: '1',
      title: 'Java Basics Challenge',
      description: 'Solve complex algorithmic problems with optimal time complexity',
      subject: 'Advanced Algorithms',
      faculty: 'Prof. karan Mehta',
      scheduledDate: '2025-09-30T14:00:00',
      duration: 240,
      totalProblems: 6,
      totalMarks: 200,
      status: 'live',
      difficulty: 'hard',
      language: ['C++', 'Java', 'Python', 'C'],
      problemTypes: ['Dynamic Programming', 'Greedy', 'Graph Algorithms'],
      attempts: 0,
      maxAttempts: 1
    },
    {
      id: '2',
      title: 'Algorithm Design Contest',
      description: 'Solve complex algorithmic problems with optimal time complexity',
      subject: 'Advanced Algorithms',
      faculty: 'Prof. Priya Sharma',
      scheduledDate: '2025-09-22T14:00:00',
      duration: 240,
      totalProblems: 6,
      totalMarks: 200,
      status: 'live',
      difficulty: 'hard',
      language: ['C++', 'Java', 'Python', 'C'],
      problemTypes: ['Dynamic Programming', 'Greedy', 'Graph Algorithms'],
      attempts: 0,
      maxAttempts: 1
    },
    {
      id: '3',
      title: 'Python Basics Challenge',
      description: 'Solve complex algorithmic problems with optimal time complexity',
      subject: 'Advanced Algorithms',
      faculty: 'Prof. shivam Gupta',
      scheduledDate: '2025-09-03T14:00:00',
      duration: 240,
      totalProblems: 6,
      totalMarks: 200,
      status: 'live',
      difficulty: 'hard',
      language: ['C++', 'Java', 'Python', 'C'],
      problemTypes: ['Dynamic Programming', 'Greedy', 'Graph Algorithms'],
      attempts: 0,
      maxAttempts: 1
    },
    {
      id: '3',
      title: 'Web Development Practical',
      description: 'Build a complete web application with frontend and backend',
      subject: 'Web Technologies',
      faculty: 'Ms. Kavya Singh',
      scheduledDate: '2025-09-22T10:00:00',
      duration: 300,
      totalProblems: 3,
      totalMarks: 120,
      status: 'completed',
      attemptDate: '2025-09-22T10:00:00',
      obtainedMarks: 105,
      solvedProblems: 3,
      timeSpent: 275,
      difficulty: 'medium',
      language: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
      problemTypes: ['Frontend', 'Backend', 'Database Integration'],
      attempts: 1,
      maxAttempts: 1
    },
    
   
    {
      id: '6',
      title: 'System Programming Lab',
      description: 'Low-level programming and operating system concepts',
      subject: 'Operating Systems',
      faculty: 'Dr. Vikash Yadav',
      scheduledDate: '2025-09-25T13:30:00',
      duration: 180,
      totalProblems: 4,
      totalMarks: 140,
      status: 'completed',
      attemptDate: '2025-09-25T13:30:00',
      obtainedMarks: 115,
      solvedProblems: 3,
      timeSpent: 165,
      difficulty: 'hard',
      language: ['C', 'Assembly'],
      problemTypes: ['Process Management', 'Memory Allocation', 'File Systems'],
      attempts: 1,
      maxAttempts: 1
    },
    {
      id: '7',
      title: 'Frontend Development Challenge',
      description: 'Build responsive web interfaces using modern frameworks',
      subject: 'Web Technologies',
      faculty: 'Ms. Kavya Singh',
      scheduledDate: '2025-09-20T14:00:00',
      duration: 240,
      totalProblems: 4,
      totalMarks: 130,
      status: 'completed',
      attemptDate: '2025-09-20T14:00:00',
      obtainedMarks: 118,
      solvedProblems: 4,
      timeSpent: 220,
      difficulty: 'medium',
      language: ['JavaScript', 'React', 'CSS'],
      problemTypes: ['Component Design', 'State Management', 'API Integration'],
      attempts: 1,
      maxAttempts: 1
    }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Check notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      return permission === 'granted';
    }

    return false;
  };

  // Show notification function
  const showNotification = (assessment: CodingAssessment) => {
    const options = {
      body: `Subject: ${assessment.subject}\nFaculty: ${assessment.faculty}\nDuration: ${assessment.duration} minutes\nProblems: ${assessment.totalProblems}\nDifficulty: ${assessment.difficulty.toUpperCase()}`,
      icon: '/favicon.ico', // You can add a custom icon path here
      badge: '/favicon.ico', // Badge icon for mobile devices
      tag: `coding-assessment-${assessment.id}`, // Unique tag to prevent duplicate notifications
      requireInteraction: false, // Set to true if you want notification to stay until user interacts
      silent: false,
      data: {
        assessmentId: assessment.id,
        url: window.location.href
      },
      actions: [
        {
          action: 'view',
          title: 'View Assessment',
          icon: '/view-icon.png' // Optional: add custom action icon
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon: '/dismiss-icon.png' // Optional: add custom action icon
        }
      ]
    };

    const notification = new Notification(`Coding Assessment Started: ${assessment.title}`, options);

    // Handle notification click
    notification.onclick = function(event) {
      event.preventDefault();
      window.focus(); // Focus the window when notification is clicked
      notification.close();
    };

    // Handle notification actions (if supported)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('notificationclick', function(event) {
        if (event.notification.tag === `coding-assessment-${assessment.id}`) {
          event.notification.close();
          
          if (event.action === 'view') {
            // Handle view action
            window.focus();
          } else if (event.action === 'dismiss') {
            // Handle dismiss action
            event.notification.close();
          } else {
            // Handle default click
            window.focus();
          }
        }
      });
    }

    // Auto close notification after 6 seconds (longer for coding assessments)
    setTimeout(() => {
      notification.close();
    }, 6000);
  };

  // Separate assessments based on status for different tabs
  const assignedAssessments = assessments.filter(a => a.status === 'upcoming' || a.status === 'live' || a.status === 'missed');
  const completedAssessments = assessments.filter(a => a.status === 'completed');

  const getFilteredAssessments = () => {
    const baseAssessments = activeTab === 'assigned' ? assignedAssessments : completedAssessments;
    
    return baseAssessments.filter(assessment => {
      const matchesSearch = searchTerm === '' || 
        assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.faculty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || assessment.status === statusFilter;
      const matchesSubject = subjectFilter === '' || assessment.subject === subjectFilter;
      
      return matchesSearch && matchesStatus && matchesSubject;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100';
      case 'live': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100';
      case 'missed': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'hard': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'live': return <Play className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'missed': return <XCircle className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const getTimeUntilAssessment = (scheduledDate: string) => {
    const now = new Date();
    const assessmentDate = new Date(scheduledDate);
    const diffTime = assessmentDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffDays > 1) return `${diffDays} days`;
    if (diffHours > 1) return `${diffHours} hours`;
    return 'Starting soon';
  };

  const handleViewDetails = (assessment: CodingAssessment) => {
    setSelectedAssessment(assessment);
    setShowDetailModal(true);
  };

  // Modified handleStartAssessment function with notification
  const handleStartAssessment = async (assessmentId: string) => {
    const assessment = assessments.find(a => a.id === assessmentId);
    if (!assessment) return;

    console.log('Starting coding assessment:', assessmentId);
    
    // Request permission and show notification
    const hasPermission = await requestNotificationPermission();
    
    if (hasPermission) {
      showNotification(assessment);
    } else {
      // Fallback: show an alert if notifications are not allowed
      alert(`Coding Assessment Started: ${assessment.title}\nDuration: ${assessment.duration} minutes`);
    }

    // Add your logic to start the assessment here
    // For example: navigate to assessment page, update status, etc.
  };

  // Summary stats based on active tab
  const getSummaryStats = () => {
    const currentAssessments = activeTab === 'assigned' ? assignedAssessments : completedAssessments;
    
    if (activeTab === 'assigned') {
      return {
        total: currentAssessments.length,
        upcoming: currentAssessments.filter(a => a.status === 'upcoming').length,
        live: currentAssessments.filter(a => a.status === 'live').length,
        missed: currentAssessments.filter(a => a.status === 'missed').length,
        easy: currentAssessments.filter(a => a.difficulty === 'easy').length,
        medium: currentAssessments.filter(a => a.difficulty === 'medium').length,
        hard: currentAssessments.filter(a => a.difficulty === 'hard').length
      };
    } else {
      return {
        total: currentAssessments.length,
        completed: currentAssessments.length,
        avgScore: currentAssessments.filter(a => a.obtainedMarks && a.totalMarks).reduce((acc, a) => acc + (a.obtainedMarks! / a.totalMarks * 100), 0) / currentAssessments.filter(a => a.obtainedMarks).length || 0,
        maxScore: Math.max(...currentAssessments.filter(a => a.obtainedMarks).map(a => (a.obtainedMarks! / a.totalMarks * 100))),
        minScore: Math.min(...currentAssessments.filter(a => a.obtainedMarks).map(a => (a.obtainedMarks! / a.totalMarks * 100))),
        totalProblems: currentAssessments.reduce((acc, a) => acc + (a.solvedProblems || 0), 0),
        totalMarks: currentAssessments.reduce((acc, a) => acc + (a.obtainedMarks || 0), 0)
      };
    }
  };

  const summaryStats = getSummaryStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
<div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-4 lg:p-6 rounded-t-lg">
  <div className="flex-1 mb-4 md:mb-0">
    <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
      <Code className="w-8 h-8 mr-3 text-white" />
      Coding Assessments
    </h1>
    <p className="text-gray-100">
      Practice and showcase your programming skills through coding challenges
    </p>
  </div>

        
        {/* Notification Permission Button */}
        <div className="flex items-center space-x-4">
          {notificationPermission === 'granted' && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Notifications Enabled</span>
            </div>
          )}
         
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
        <button
          onClick={() => setActiveTab('assigned')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
            activeTab === 'assigned'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Code className="w-5 h-5" />
          <span>Assigned ({assignedAssessments.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
            activeTab === 'completed'
              ? 'bg-green-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Award className="w-5 h-5" />
          <span>Completed ({completedAssessments.length})</span>
        </button>
      </div>

      {/* Summary Cards */}
      {activeTab === 'assigned' ? (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{summaryStats.total}</p>
              </div>
              <Code className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Upcoming</p>
                <p className="text-2xl font-bold">{summaryStats.upcoming}</p>
              </div>
              <Clock className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Live</p>
                <p className="text-2xl font-bold">{summaryStats.live}</p>
              </div>
              <Zap className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Missed</p>
                <p className="text-2xl font-bold">{summaryStats.missed}</p>
              </div>
              <XCircle className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Easy</p>
                <p className="text-2xl font-bold">{summaryStats.easy}</p>
              </div>
              <CheckCircle className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Medium</p>
                <p className="text-2xl font-bold">{summaryStats.medium}</p>
              </div>
              <Timer className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Hard</p>
                <p className="text-2xl font-bold">{summaryStats.hard}</p>
              </div>
              <Cpu className="w-6 h-6 opacity-80" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{summaryStats.total}</p>
              </div>
              <Code className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold">{summaryStats.completed}</p>
              </div>
              <CheckCircle className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Avg Score</p>
                <p className="text-2xl font-bold">{summaryStats.avgScore ? summaryStats.avgScore.toFixed(0) : 0}%</p>
              </div>
              <Star className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Best Score</p>
                <p className="text-2xl font-bold">{summaryStats.maxScore && isFinite(summaryStats.maxScore) ? summaryStats.maxScore.toFixed(0) : 0}%</p>
              </div>
              <Award className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Lowest Score</p>
                <p className="text-2xl font-bold">{summaryStats.minScore && isFinite(summaryStats.minScore) ? summaryStats.minScore.toFixed(0) : 0}%</p>
              </div>
              <XCircle className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Problems Solved</p>
                <p className="text-2xl font-bold">{summaryStats.totalProblems || 0}</p>
              </div>
              <Terminal className="w-6 h-6 opacity-80" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search coding assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            {activeTab === 'assigned' ? (
              <>
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="missed">Missed</option>
              </>
            ) : (
              <option value="completed">Completed</option>
            )}
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            <option value="Advanced Algorithms">Advanced Algorithms</option>
            <option value="Web Technologies">Web Technologies</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Database Management">Database Management</option>
            <option value="Operating Systems">Operating Systems</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setSubjectFilter('');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredAssessments().map((assessment) => (
          <div
            key={assessment.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                    {assessment.difficulty.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {assessment.totalProblems} Problems
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assessment.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(assessment.status)}
                    <span>{assessment.status.toUpperCase()}</span>
                  </div>
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {assessment.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {assessment.description}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{assessment.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{assessment.faculty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(assessment.scheduledDate).toLocaleDateString('en-IN')} at {new Date(assessment.scheduledDate).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Duration: {assessment.duration} mins
                  </span>
                  {assessment.status === 'upcoming' && activeTab === 'assigned' && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded">
                      {getTimeUntilAssessment(assessment.scheduledDate)}
                    </span>
                  )}
                </div>

                {/* Programming Languages */}
                <div className="flex items-start space-x-2">
                  <Terminal className="w-4 h-4 text-indigo-500 mt-0.5" />
                  <div className="flex flex-wrap gap-1">
                    {assessment.language.slice(0, 3).map((lang, index) => (
                      <span key={index} className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-1 rounded">
                        {lang}
                      </span>
                    ))}
                    {assessment.language.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                        +{assessment.language.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Problems: <span className="font-medium">{assessment.totalProblems}</span></div>
                  <div>Marks: <span className="font-medium">{assessment.totalMarks}</span></div>
                  {activeTab === 'assigned' ? (
                    <div className="col-span-2">Attempts: <span className="font-medium">{assessment.attempts}/{assessment.maxAttempts}</span></div>
                  ) : (
                    <>
                      <div className="text-green-600 dark:text-green-400 font-bold">
                        Score: {assessment.obtainedMarks}/{assessment.totalMarks}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 font-bold">
                        {assessment.obtainedMarks ? ((assessment.obtainedMarks/assessment.totalMarks)*100).toFixed(1) : 0}%
                      </div>
                      {assessment.solvedProblems && (
                        <div className="text-purple-600 dark:text-purple-400 font-medium">
                          Solved: {assessment.solvedProblems}/{assessment.totalProblems}
                        </div>
                      )}
                      {assessment.attemptDate && (
                        <div className="text-xs text-gray-500">
                          Completed: {new Date(assessment.attemptDate).toLocaleDateString('en-IN')}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {activeTab === 'assigned' ? (
                  <>
                    {assessment.status === 'live' && (
                      <button 
                        onClick={() => handleStartAssessment(assessment.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Assessment</span>
                      </button>
                    )}
                    {assessment.status === 'upcoming' && (
                      <button 
                        disabled
                        className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 cursor-not-allowed"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Scheduled</span>
                      </button>
                    )}
                    {assessment.status === 'missed' && (
                      <button 
                        disabled
                        className="flex-1 bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 cursor-not-allowed"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Missed</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetails(assessment)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleViewDetails(assessment)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Score Details</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal - Rest of your existing modal code with updated start button */}
      {showDetailModal && selectedAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedAssessment.title}
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Assessment Overview</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Subject:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.subject}</p>
                    </div>
                    <div>
                      <span className="font-medium">Faculty:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.faculty}</p>
                    </div>
                    <div>
                      <span className="font-medium">Date & Time:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        {new Date(selectedAssessment.scheduledDate).toLocaleDateString('en-IN')} at {new Date(selectedAssessment.scheduledDate).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.duration} minutes</p>
                    </div>
                    <div>
                      <span className="font-medium">Problems:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.totalProblems}</p>
                    </div>
                    <div>
                      <span className="font-medium">Total Marks:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.totalMarks}</p>
                    </div>
                  </div>

                  {/* Programming Languages */}
                  <div>
                    <h4 className="font-semibold mb-2">Supported Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAssessment.language.map((lang, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-sm font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Problem Types */}
                  <div>
                    <h4 className="font-semibold mb-2">Problem Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAssessment.problemTypes.map((type, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Cpu className="w-5 h-5 mr-2" />
                      Assessment Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedAssessment.status)}`}>
                          {selectedAssessment.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedAssessment.difficulty)}`}>
                          {selectedAssessment.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attempts:</span>
                        <span className="font-medium">{selectedAssessment.attempts}/{selectedAssessment.maxAttempts}</span>
                      </div>
                    </div>
                  </div>

                  {selectedAssessment.status === 'completed' && selectedAssessment.obtainedMarks !== undefined && (
                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Coding Results
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Score:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {selectedAssessment.obtainedMarks}/{selectedAssessment.totalMarks}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Percentage:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {((selectedAssessment.obtainedMarks/selectedAssessment.totalMarks)*100).toFixed(1)}%
                          </span>
                        </div>
                        {selectedAssessment.solvedProblems && (
                          <div className="flex justify-between">
                            <span>Problems Solved:</span>
                            <span className="font-medium">{selectedAssessment.solvedProblems}/{selectedAssessment.totalProblems}</span>
                          </div>
                        )}
                        {selectedAssessment.timeSpent && (
                          <div className="flex justify-between">
                            <span>Time Spent:</span>
                            <span className="font-medium">{selectedAssessment.timeSpent} mins</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedAssessment.status === 'upcoming' && (
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Instructions</h4>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Ensure stable internet connection</li>
                        <li>• Use latest version of Chrome/Firefox</li>
                        <li>• Test your camera and microphone</li>
                        <li>• Keep your student ID ready</li>
                        <li>• Practice with sample problems</li>
                        <li>• Review time complexity concepts</li>
                      </ul>
                    </div>
                  )}

                  {selectedAssessment.status === 'live' && (
                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Assessment is Live!</h4>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                        The coding assessment is currently active. Click the button below to join.
                      </p>
                      <button 
                        onClick={() => handleStartAssessment(selectedAssessment.id)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Join Assessment Now</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
              {selectedAssessment.status === 'live' && (
                <button 
                  onClick={() => handleStartAssessment(selectedAssessment.id)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center space-x-2"
                >
                  <Code className="w-4 h-4" />
                  <span>Start Coding</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCodingAssessments;
