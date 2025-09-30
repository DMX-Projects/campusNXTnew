import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Play,
  Pause,
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
  Bell
} from 'lucide-react';

interface OnlineTest {
  id: string;
  title: string;
  description: string;
  subject: string;
  faculty: string;
  scheduledDate: string;
  duration: number; // in minutes
  totalQuestions: number;
  totalMarks: number;
  status: 'upcoming' | 'live' | 'completed' | 'missed';
  attemptDate?: string;
  obtainedMarks?: number;
  correctAnswers?: number;
  timeSpent?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq' | 'descriptive' | 'mixed';
  attempts: number;
  maxAttempts: number;
}

const StudentOnlineTests: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [activeTab, setActiveTab] = useState<'assigned' | 'completed'>('assigned');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [selectedTest, setSelectedTest] = useState<OnlineTest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Sample tests data
  const [tests] = useState<OnlineTest[]>([
  
    {
      id: '1',
      title: 'Database Concepts Quiz',
      description: 'Quick assessment on database normalization and ER diagrams',
      subject: 'Database Management',
      faculty: 'Prof. Priya Sharma',
      scheduledDate: '2025-09-24T10:00:00',
      duration: 45,
      totalQuestions: 20,
      totalMarks: 40,
      status: 'live',
      difficulty: 'easy',
      type: 'mcq',
      attempts: 0,
      maxAttempts: 2
    },
    {
      id: '2',
      title: 'Machine Learning Algorithms Test',
      description: 'Quick assessment on machine learning algorithms',
      subject: 'Machine Learning',
      faculty: 'Dr. Arjun Reddy',
      scheduledDate: '2025-09-28T10:00:00',
      duration: 45,
      totalQuestions: 20,
      totalMarks: 40,
      status: 'live',
      difficulty: 'easy',
      type: 'mcq',
      attempts: 0,
      maxAttempts: 2
    },
    
    {
      id: '3',
      title: 'c++ Basics Quiz',
      description: 'Quick assessment on C++ basics and syntax',
      subject: 'Programming Languages',
      faculty: 'Prof. Anjali Verma',
      scheduledDate: '2025-09-03T10:00:00',
      duration: 45,
      totalQuestions: 20,
      totalMarks: 40,
      status: 'live',
      difficulty: 'easy',
      type: 'mcq',
      attempts: 0,
      maxAttempts: 2
    },
    {
      id: '4',
      title: 'Python Algorithms Test',
      description: 'Quick assessment on Python algorithms',
      subject: 'Machine Learning',
      faculty: 'Dr. Arjun Reddy',
      scheduledDate: '2025-09-09T10:00:00',
      duration: 45,
      totalQuestions: 20,
      totalMarks: 40,
      status: 'live',
      difficulty: 'easy',
      type: 'mcq',
      attempts: 0,
      maxAttempts: 2
    },
    {
      id: '5',
      title: 'Machine Learning Algorithms Test',
      description: 'Test covering supervised and unsupervised learning algorithms',
      subject: 'Machine Learning',
      faculty: 'Dr. Arjun Reddy',
      scheduledDate: '2025-09-25T16:00:00',
      duration: 90,
      totalQuestions: 30,
      totalMarks: 75,
      status: 'completed',
      attemptDate: '2025-09-25T16:00:00',
      obtainedMarks: 68,
      correctAnswers: 27,
      timeSpent: 85,
      difficulty: 'hard',
      type: 'mixed',
      attempts: 1,
      maxAttempts: 1
    },
   
   
    {
      id: '6',
      title: 'Software Engineering Practice Test',
      description: 'Test on SDLC, testing methodologies, and project management',
      subject: 'Software Engineering',
      faculty: 'Dr. Vikash Yadav',
      scheduledDate: '2025-09-22T13:00:00',
      duration: 75,
      totalQuestions: 35,
      totalMarks: 70,
      status: 'completed',
      attemptDate: '2025-09-22T13:00:00',
      obtainedMarks: 62,
      correctAnswers: 31,
      timeSpent: 72,
      difficulty: 'medium',
      type: 'mcq',
      attempts: 1,
      maxAttempts: 2
    },
    {
      id: '7',
      title: 'Algorithm Analysis Quiz',
      description: 'Quick quiz on time and space complexity analysis',
      subject: 'Data Structures',
      faculty: 'Dr. Rajesh Kumar',
      scheduledDate: '2025-09-18T15:00:00',
      duration: 30,
      totalQuestions: 15,
      totalMarks: 30,
      status: 'completed',
      attemptDate: '2025-09-18T15:00:00',
      obtainedMarks: 28,
      correctAnswers: 14,
      timeSpent: 28,
      difficulty: 'easy',
      type: 'mcq',
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
  const showNotification = (test: OnlineTest) => {
    const options = {
      body: `Subject: ${test.subject}\nFaculty: ${test.faculty}\nDuration: ${test.duration} minutes\nQuestions: ${test.totalQuestions}\nTotal Marks: ${test.totalMarks}\nDifficulty: ${test.difficulty.toUpperCase()}`,
      icon: '/favicon.ico', // You can add a custom icon path here
      badge: '/favicon.ico', // Badge icon for mobile devices
      tag: `online-test-${test.id}`, // Unique tag to prevent duplicate notifications
      requireInteraction: true, // Keep notification until user interacts (important for tests)
      silent: false,
      data: {
        testId: test.id,
        url: window.location.href
      },
      actions: [
        {
          action: 'view',
          title: 'View Test',
          icon: '/view-icon.png' // Optional: add custom action icon
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon: '/dismiss-icon.png' // Optional: add custom action icon
        }
      ]
    };

    const notification = new Notification(`Online Test Started: ${test.title}`, options);

    // Handle notification click
    notification.onclick = function(event) {
      event.preventDefault();
      window.focus(); // Focus the window when notification is clicked
      notification.close();
    };

    // Handle notification actions (if supported)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('notificationclick', function(event) {
        if (event.notification.tag === `online-test-${test.id}`) {
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

    // Don't auto-close for tests (requireInteraction: true handles this)
    // User needs to manually dismiss or interact with the notification
  };

  // Separate tests based on status for different tabs
  const assignedTests = tests.filter(t => t.status === 'upcoming' || t.status === 'live' || t.status === 'missed');
  const completedTests = tests.filter(t => t.status === 'completed');

  const getFilteredTests = () => {
    const baseTests = activeTab === 'assigned' ? assignedTests : completedTests;
    
    return baseTests.filter(test => {
      const matchesSearch = searchTerm === '' || 
        test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.faculty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || test.status === statusFilter;
      const matchesSubject = subjectFilter === '' || test.subject === subjectFilter;
      
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
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getTimeUntilTest = (scheduledDate: string) => {
    const now = new Date();
    const testDate = new Date(scheduledDate);
    const diffTime = testDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffDays > 1) return `${diffDays} days`;
    if (diffHours > 1) return `${diffHours} hours`;
    return 'Starting soon';
  };

  const handleViewDetails = (test: OnlineTest) => {
    setSelectedTest(test);
    setShowDetailModal(true);
  };

  // Modified handleStartTest function with notification
  const handleStartTest = async (testId: string) => {
    const test = tests.find(t => t.id === testId);
    if (!test) return;

    console.log('Starting online test:', testId);
    
    // Request permission and show notification
    const hasPermission = await requestNotificationPermission();
    
    if (hasPermission) {
      showNotification(test);
    } else {
      // Fallback: show an alert if notifications are not allowed
      alert(`Online Test Started: ${test.title}\nDuration: ${test.duration} minutes\nQuestions: ${test.totalQuestions}`);
    }

    // Add your logic to start the test here
    // For example: navigate to test page, update status, etc.
  };

  // Summary stats based on active tab
  const getSummaryStats = () => {
    const currentTests = activeTab === 'assigned' ? assignedTests : completedTests;
    
    if (activeTab === 'assigned') {
      return {
        total: currentTests.length,
        upcoming: currentTests.filter(t => t.status === 'upcoming').length,
        live: currentTests.filter(t => t.status === 'live').length,
        missed: currentTests.filter(t => t.status === 'missed').length,
        easy: currentTests.filter(t => t.difficulty === 'easy').length,
        medium: currentTests.filter(t => t.difficulty === 'medium').length,
        hard: currentTests.filter(t => t.difficulty === 'hard').length
      };
    } else {
      return {
        total: currentTests.length,
        completed: currentTests.length,
        avgScore: currentTests.filter(t => t.obtainedMarks && t.totalMarks).reduce((acc, t) => acc + (t.obtainedMarks! / t.totalMarks * 100), 0) / currentTests.filter(t => t.obtainedMarks).length || 0,
        maxScore: Math.max(...currentTests.filter(t => t.obtainedMarks).map(t => (t.obtainedMarks! / t.totalMarks * 100))),
        minScore: Math.min(...currentTests.filter(t => t.obtainedMarks).map(t => (t.obtainedMarks! / t.totalMarks * 100))),
        totalMarks: currentTests.reduce((acc, t) => acc + (t.obtainedMarks || 0), 0),
        maxPossible: currentTests.reduce((acc, t) => acc + t.totalMarks, 0)
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
            <Monitor className="w-8 h-8 mr-3 text-white" />
            Online Tests
          </h1>
          <p className="text-gray-100">
            Take online tests and track your performance across all subjects
          </p>
        </div>
        
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
          <Clock className="w-5 h-5" />
          <span>Assigned Tests ({assignedTests.length})</span>
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
          <span>Completed Tests ({completedTests.length})</span>
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
              <Monitor className="w-6 h-6 opacity-80" />
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
              <Play className="w-6 h-6 opacity-80" />
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
              <XCircle className="w-6 h-6 opacity-80" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Tests</p>
                <p className="text-2xl font-bold">{summaryStats.total}</p>
              </div>
              <Monitor className="w-6 h-6 opacity-80" />
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
                <p className="text-indigo-100 text-sm font-medium">Total Score</p>
                <p className="text-2xl font-bold">{summaryStats.totalMarks || 0}</p>
              </div>
              <Star className="w-6 h-6 opacity-80" />
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
              placeholder="Search tests..."
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
            <option value="Data Structures">Data Structures</option>
            <option value="Database Management">Database Management</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Web Technologies">Web Technologies</option>
            <option value="Network Security">Network Security</option>
            <option value="Software Engineering">Software Engineering</option>
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

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredTests().map((test) => (
          <div
            key={test.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {test.type.toUpperCase()}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(test.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(test.status)}
                    <span>{test.status.toUpperCase()}</span>
                  </div>
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {test.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {test.description}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{test.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{test.faculty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(test.scheduledDate).toLocaleDateString('en-IN')} at {new Date(test.scheduledDate).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Duration: {test.duration} mins
                  </span>
                  {test.status === 'upcoming' && activeTab === 'assigned' && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded">
                      {getTimeUntilTest(test.scheduledDate)}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Questions: <span className="font-medium">{test.totalQuestions}</span></div>
                  <div>Marks: <span className="font-medium">{test.totalMarks}</span></div>
                  {activeTab === 'assigned' ? (
                    <div className="col-span-2">Attempts: <span className="font-medium">{test.attempts}/{test.maxAttempts}</span></div>
                  ) : (
                    <>
                      <div className="text-green-600 dark:text-green-400 font-bold">
                        Score: {test.obtainedMarks}/{test.totalMarks}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 font-bold">
                        {test.obtainedMarks ? ((test.obtainedMarks/test.totalMarks)*100).toFixed(1) : 0}%
                      </div>
                      {test.attemptDate && (
                        <div className="col-span-2 text-xs text-gray-500">
                          Completed: {new Date(test.attemptDate).toLocaleDateString('en-IN')}
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
                    {test.status === 'live' && (
                      <button 
                        onClick={() => handleStartTest(test.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Test</span>
                      </button>
                    )}
                    {test.status === 'upcoming' && (
                      <button 
                        disabled
                        className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 cursor-not-allowed"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Scheduled</span>
                      </button>
                    )}
                    {test.status === 'missed' && (
                      <button 
                        disabled
                        className="flex-1 bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 cursor-not-allowed"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Missed</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetails(test)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleViewDetails(test)}
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

      {/* Detail Modal - Updated with Start Test button notification */}
      {showDetailModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedTest.title}
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
                    <h3 className="text-lg font-semibold mb-2">Test Details</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedTest.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Subject:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedTest.subject}</p>
                    </div>
                    <div>
                      <span className="font-medium">Faculty:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedTest.faculty}</p>
                    </div>
                    <div>
                      <span className="font-medium">Date & Time:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        {new Date(selectedTest.scheduledDate).toLocaleDateString('en-IN')} at {new Date(selectedTest.scheduledDate).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedTest.duration} minutes</p>
                    </div>
                    <div>
                      <span className="font-medium">Questions:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedTest.totalQuestions}</p>
                    </div>
                    <div>
                      <span className="font-medium">Total Marks:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedTest.totalMarks}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Test Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedTest.status)}`}>
                          {selectedTest.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedTest.difficulty)}`}>
                          {selectedTest.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{selectedTest.type.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attempts:</span>
                        <span className="font-medium">{selectedTest.attempts}/{selectedTest.maxAttempts}</span>
                      </div>
                    </div>
                  </div>

                  {selectedTest.status === 'completed' && selectedTest.obtainedMarks !== undefined && (
                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Test Results
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Obtained Marks:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {selectedTest.obtainedMarks}/{selectedTest.totalMarks}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Percentage:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {((selectedTest.obtainedMarks/selectedTest.totalMarks)*100).toFixed(1)}%
                          </span>
                        </div>
                        {selectedTest.correctAnswers && (
                          <div className="flex justify-between">
                            <span>Correct Answers:</span>
                            <span className="font-medium">{selectedTest.correctAnswers}/{selectedTest.totalQuestions}</span>
                          </div>
                        )}
                        {selectedTest.timeSpent && (
                          <div className="flex justify-between">
                            <span>Time Spent:</span>
                            <span className="font-medium">{selectedTest.timeSpent} mins</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedTest.status === 'upcoming' && (
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Instructions</h4>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Ensure stable internet connection</li>
                        <li>• Use latest version of Chrome/Firefox</li>
                        <li>• Close all other applications</li>
                        <li>• Keep your student ID ready</li>
                        <li>• Do not refresh the browser during test</li>
                      </ul>
                    </div>
                  )}

                  {selectedTest.status === 'live' && (
                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Test is Live!</h4>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                        The test is currently available. Click "Start Test" to begin.
                      </p>
                      <button 
                        onClick={() => handleStartTest(selectedTest.id)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Test Now</span>
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
              {selectedTest.status === 'live' && (
                <button 
                  onClick={() => handleStartTest(selectedTest.id)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Test Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentOnlineTests;
