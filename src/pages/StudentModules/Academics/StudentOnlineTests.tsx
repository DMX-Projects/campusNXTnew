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
  Award
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

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [selectedTest, setSelectedTest] = useState<OnlineTest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Sample tests data
  const [tests] = useState<OnlineTest[]>([
    {
      id: '1',
      title: 'Data Structures Mid-term Test',
      description: 'Comprehensive test on arrays, linked lists, stacks, and queues',
      subject: 'Data Structures',
      faculty: 'Dr. Rajesh Kumar',
      scheduledDate: '2025-10-05T14:00:00',
      duration: 120,
      totalQuestions: 50,
      totalMarks: 100,
      status: 'upcoming',
      difficulty: 'medium',
      type: 'mcq',
      attempts: 0,
      maxAttempts: 1
    },
    {
      id: '2',
      title: 'Database Concepts Quiz',
      description: 'Quick assessment on database normalization and ER diagrams',
      subject: 'Database Management',
      faculty: 'Prof. Priya Sharma',
      scheduledDate: '2025-09-30T10:00:00',
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
      id: '4',
      title: 'Web Technologies Unit Test',
      description: 'Assessment on HTML5, CSS3, and JavaScript fundamentals',
      subject: 'Web Technologies',
      faculty: 'Ms. Kavya Singh',
      scheduledDate: '2025-09-20T11:00:00',
      duration: 60,
      totalQuestions: 25,
      totalMarks: 50,
      status: 'missed',
      difficulty: 'easy',
      type: 'mcq',
      attempts: 0,
      maxAttempts: 1
    },
    {
      id: '5',
      title: 'Network Security Final Test',
      description: 'Comprehensive test on cryptography, firewalls, and security protocols',
      subject: 'Network Security',
      faculty: 'Prof. Deepika Nair',
      scheduledDate: '2025-10-15T14:30:00',
      duration: 180,
      totalQuestions: 40,
      totalMarks: 120,
      status: 'upcoming',
      difficulty: 'hard',
      type: 'mixed',
      attempts: 0,
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

  const filteredTests = tests.filter(test => {
    const matchesSearch = searchTerm === '' || 
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || test.status === statusFilter;
    const matchesSubject = subjectFilter === '' || test.subject === subjectFilter;
    
    return matchesSearch && matchesStatus && matchesSubject;
  });

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

  const summaryStats = {
    total: tests.length,
    upcoming: tests.filter(t => t.status === 'upcoming').length,
    live: tests.filter(t => t.status === 'live').length,
    completed: tests.filter(t => t.status === 'completed').length,
    missed: tests.filter(t => t.status === 'missed').length,
    avgScore: tests.filter(t => t.obtainedMarks && t.totalMarks).reduce((acc, t) => acc + (t.obtainedMarks! / t.totalMarks * 100), 0) / tests.filter(t => t.obtainedMarks).length || 0
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Monitor className="w-8 h-8 mr-3 text-blue-500" />
            Online Tests
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Take online tests and track your performance across all subjects
          </p>
        </div>
        <button
          className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
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

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold">{summaryStats.completed}</p>
            </div>
            <CheckCircle className="w-6 h-6 opacity-80" />
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

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Avg Score</p>
              <p className="text-2xl font-bold">{summaryStats.avgScore.toFixed(0)}%</p>
            </div>
            <Star className="w-6 h-6 opacity-80" />
          </div>
        </div>
      </div>

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
            <option value="upcoming">Upcoming</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
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
        {filteredTests.map((test) => (
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
                  {test.status === 'upcoming' && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded">
                      {getTimeUntilTest(test.scheduledDate)}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Questions: <span className="font-medium">{test.totalQuestions}</span></div>
                  <div>Marks: <span className="font-medium">{test.totalMarks}</span></div>
                  <div>Attempts: <span className="font-medium">{test.attempts}/{test.maxAttempts}</span></div>
                  {test.obtainedMarks && (
                    <div className="text-green-600 dark:text-green-400 font-bold">
                      Score: {test.obtainedMarks}/{test.totalMarks}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewDetails(test)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                {test.status === 'live' && (
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>Start Test</span>
                  </button>
                )}
                {test.status === 'upcoming' && test.attempts < test.maxAttempts && (
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                    <Clock className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
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

                  {selectedTest.status === 'completed' && selectedTest.obtainedMarks && (
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
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center space-x-2">
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
