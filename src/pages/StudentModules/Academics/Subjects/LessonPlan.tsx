import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Play,
  Download,
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  User,
  FileText,
  CheckCircle,
  Video,
  Link,
  Star
} from 'lucide-react';

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  faculty: string;
  unit: string;
  chapter: string;
  description: string;
  date: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'ongoing' | 'cancelled';
  objectives: string[];
  materials: string[];
  resources: Resource[];
  type: 'theory' | 'practical' | 'tutorial';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  attendance?: number;
}

interface Resource {
  name: string;
  type: 'pdf' | 'video' | 'link' | 'presentation';
  url: string;
  size?: string;
}

const LessonPlan: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Sample lesson plans data
  const [lessonPlans] = useState<LessonPlan[]>([
    {
      id: '1',
      title: 'Introduction to Data Structures',
      subject: 'Data Structures & Algorithms',
      faculty: 'Dr. Rajesh Kumar',
      unit: 'Unit 1',
      chapter: 'Chapter 1',
      description: 'Basic concepts of data structures, arrays, and memory management',
      date: '2025-10-01',
      duration: 60,
      status: 'scheduled',
      objectives: [
        'Understand basic data structure concepts',
        'Learn about arrays and their operations',
        'Memory allocation and management'
      ],
      materials: ['Textbook Chapter 1', 'Code examples', 'Practice problems'],
      resources: [
        { name: 'Data Structures Notes.pdf', type: 'pdf', url: '#', size: '2.5 MB' },
        { name: 'Array Operations Demo', type: 'video', url: '#', size: '45 MB' },
        { name: 'GeeksforGeeks Arrays', type: 'link', url: '#' }
      ],
      type: 'theory',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Database Normalization Practical',
      subject: 'Database Management Systems',
      faculty: 'Prof. Priya Sharma',
      unit: 'Unit 3',
      chapter: 'Chapter 5',
      description: 'Hands-on practice with database normalization techniques',
      date: '2025-09-28',
      duration: 90,
      status: 'completed',
      attendance: 45,
      objectives: [
        'Apply 1NF, 2NF, 3NF normalization',
        'Identify functional dependencies',
        'Design normalized database schemas'
      ],
      materials: ['Lab manual', 'Sample databases', 'ER diagrams'],
      resources: [
        { name: 'Normalization Guide.pdf', type: 'pdf', url: '#', size: '1.8 MB' },
        { name: 'Normalization Examples', type: 'presentation', url: '#', size: '3.2 MB' },
        { name: 'Practice Database', type: 'link', url: '#' }
      ],
      type: 'practical',
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: 'Machine Learning Algorithms Overview',
      subject: 'Machine Learning',
      faculty: 'Dr. Arjun Reddy',
      unit: 'Unit 2',
      chapter: 'Chapter 3',
      description: 'Comprehensive overview of supervised and unsupervised learning',
      date: '2025-09-30',
      duration: 75,
      status: 'ongoing',
      objectives: [
        'Differentiate between supervised and unsupervised learning',
        'Understand classification and regression',
        'Explore clustering algorithms'
      ],
      materials: ['Research papers', 'Algorithm implementations', 'Dataset samples'],
      resources: [
        { name: 'ML Algorithms.pdf', type: 'pdf', url: '#', size: '4.1 MB' },
        { name: 'Scikit-learn Tutorial', type: 'video', url: '#', size: '120 MB' },
        { name: 'Kaggle Datasets', type: 'link', url: '#' }
      ],
      type: 'theory',
      difficulty: 'advanced'
    },
    {
      id: '4',
      title: 'Web Development Frameworks',
      subject: 'Web Technologies',
      faculty: 'Ms. Kavya Singh',
      unit: 'Unit 4',
      chapter: 'Chapter 8',
      description: 'Introduction to modern web frameworks: React, Angular, Vue',
      date: '2025-10-03',
      duration: 120,
      status: 'scheduled',
      objectives: [
        'Compare different web frameworks',
        'Set up React development environment',
        'Build a simple React application'
      ],
      materials: ['Framework documentation', 'Code repositories', 'Tutorial videos'],
      resources: [
        { name: 'React Basics.pdf', type: 'pdf', url: '#', size: '3.7 MB' },
        { name: 'React Setup Guide', type: 'video', url: '#', size: '85 MB' },
        { name: 'Official React Docs', type: 'link', url: '#' }
      ],
      type: 'practical',
      difficulty: 'intermediate'
    },
    {
      id: '5',
      title: 'Network Security Protocols',
      subject: 'Network Security',
      faculty: 'Prof. Deepika Nair',
      unit: 'Unit 2',
      chapter: 'Chapter 4',
      description: 'Understanding SSL/TLS, IPSec, and other security protocols',
      date: '2025-09-25',
      duration: 80,
      status: 'completed',
      attendance: 42,
      objectives: [
        'Learn about encryption protocols',
        'Understand certificate management',
        'Implement basic security measures'
      ],
      materials: ['Security handbooks', 'Protocol specifications', 'Case studies'],
      resources: [
        { name: 'Security Protocols.pdf', type: 'pdf', url: '#', size: '5.2 MB' },
        { name: 'SSL/TLS Demo', type: 'video', url: '#', size: '67 MB' },
        { name: 'OWASP Guidelines', type: 'link', url: '#' }
      ],
      type: 'theory',
      difficulty: 'advanced'
    },
    {
      id: '6',
      title: 'Software Testing Methodologies',
      subject: 'Software Engineering',
      faculty: 'Dr. Vikash Yadav',
      unit: 'Unit 5',
      chapter: 'Chapter 9',
      description: 'Various testing approaches: unit, integration, and system testing',
      date: '2025-10-05',
      duration: 90,
      status: 'scheduled',
      objectives: [
        'Understand different testing levels',
        'Learn test case design techniques',
        'Practice automated testing tools'
      ],
      materials: ['Testing frameworks', 'Sample applications', 'Bug reports'],
      resources: [
        { name: 'Testing Guide.pdf', type: 'pdf', url: '#', size: '2.9 MB' },
        { name: 'JUnit Tutorial', type: 'video', url: '#', size: '95 MB' },
        { name: 'Testing Tools', type: 'link', url: '#' }
      ],
      type: 'tutorial',
      difficulty: 'intermediate'
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

  const filteredLessons = lessonPlans.filter(lesson => {
    const matchesSearch = searchTerm === '' || 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || lesson.status === statusFilter;
    const matchesSubject = subjectFilter === '' || lesson.subject === subjectFilter;
    
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100';
      case 'ongoing': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500 text-white';
      case 'intermediate': return 'bg-yellow-500 text-white';
      case 'advanced': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="w-4 h-4" />;
      case 'practical': return <Play className="w-4 h-4" />;
      case 'tutorial': return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'presentation': return <FileText className="w-4 h-4 text-orange-500" />;
      case 'link': return <Link className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (lesson: LessonPlan) => {
    setSelectedLesson(lesson);
    setShowDetailModal(true);
  };

  const summaryStats = {
    total: lessonPlans.length,
    scheduled: lessonPlans.filter(l => l.status === 'scheduled').length,
    ongoing: lessonPlans.filter(l => l.status === 'ongoing').length,
    completed: lessonPlans.filter(l => l.status === 'completed').length,
    cancelled: lessonPlans.filter(l => l.status === 'cancelled').length,
    avgDuration: Math.round(lessonPlans.reduce((acc, l) => acc + l.duration, 0) / lessonPlans.length)
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-500" />
            Lesson Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Access detailed lesson plans, objectives, and learning resources for all your subjects
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
            <BookOpen className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Scheduled</p>
              <p className="text-2xl font-bold">{summaryStats.scheduled}</p>
            </div>
            <Calendar className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Ongoing</p>
              <p className="text-2xl font-bold">{summaryStats.ongoing}</p>
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
              <p className="text-red-100 text-sm font-medium">Cancelled</p>
              <p className="text-2xl font-bold">{summaryStats.cancelled}</p>
            </div>
            <Calendar className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Avg Duration</p>
              <p className="text-2xl font-bold">{summaryStats.avgDuration}m</p>
            </div>
            <Clock className="w-6 h-6 opacity-80" />
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
              placeholder="Search lesson plans..."
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
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            <option value="Database Management Systems">Database Management Systems</option>
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

      {/* Lesson Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                    {getTypeIcon(lesson.type)}
                    <span>{lesson.type.toUpperCase()}</span>
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lesson.status)}`}>
                  {lesson.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {lesson.description}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{lesson.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{lesson.faculty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(lesson.date).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {lesson.duration} minutes
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>{lesson.unit}</div>
                  <div>{lesson.chapter}</div>
                  {lesson.attendance && (
                    <div className="col-span-2 text-green-600 dark:text-green-400 font-medium">
                      Attendance: {lesson.attendance} students
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewDetails(lesson)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                {lesson.resources.length > 0 && (
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedLesson.title}
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
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Lesson Overview</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedLesson.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Subject:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedLesson.subject}</p>
                      </div>
                      <div>
                        <span className="font-medium">Faculty:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedLesson.faculty}</p>
                      </div>
                      <div>
                        <span className="font-medium">Unit:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedLesson.unit}</p>
                      </div>
                      <div>
                        <span className="font-medium">Chapter:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedLesson.chapter}</p>
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>
                        <p className="text-gray-600 dark:text-gray-400">{new Date(selectedLesson.date).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedLesson.duration} minutes</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Learning Objectives</h4>
                    <ul className="space-y-2">
                      {selectedLesson.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Required Materials</h4>
                    <ul className="space-y-2">
                      {selectedLesson.materials.map((material, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Lesson Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedLesson.status)}`}>
                          {selectedLesson.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="flex items-center space-x-1">
                          {getTypeIcon(selectedLesson.type)}
                          <span className="capitalize">{selectedLesson.type}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedLesson.difficulty)}`}>
                          {selectedLesson.difficulty.toUpperCase()}
                        </span>
                      </div>
                      {selectedLesson.attendance && (
                        <div className="flex justify-between">
                          <span>Attendance:</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {selectedLesson.attendance} students
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Learning Resources</h4>
                    <div className="space-y-3">
                      {selectedLesson.resources.map((resource, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow duration-200">
                          {getResourceIcon(resource.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {resource.name}
                            </p>
                            {resource.size && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {resource.size}
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={() => window.open(resource.url, '_blank')}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                          >
                            {resource.type === 'link' ? <Link className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
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
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
                Download All Resources
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPlan;
