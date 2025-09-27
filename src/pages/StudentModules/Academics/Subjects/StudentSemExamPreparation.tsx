import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  Target,
  Award,
  BarChart3,
  FileText,
  Video,
  Brain,
  Timer
} from 'lucide-react';

interface ExamSubject {
  id: string;
  subjectName: string;
  subjectCode: string;
  credits: number;
  examDate: string;
  examTime: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  syllabus: SyllabusUnit[];
  preparationStatus: number; // percentage
  studyHours: number;
  targetScore: number;
  lastYearScore?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  examType: 'theory' | 'practical' | 'both';
  materials: StudyResource[];
}

interface SyllabusUnit {
  unitNumber: number;
  unitName: string;
  topics: string[];
  completed: boolean;
  weightage: number;
}

interface StudyResource {
  id: string;
  title: string;
  type: 'notes' | 'video' | 'practice' | 'mock_test';
  completed: boolean;
  timeSpent: number;
}

interface StudyPlan {
  date: string;
  subject: string;
  topics: string[];
  targetHours: number;
  actualHours: number;
  completed: boolean;
}

const StudentSemExamPreparation: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<ExamSubject | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'progress'>('overview');

  // Sample exam subjects data
  const [examSubjects] = useState<ExamSubject[]>([
    {
      id: '1',
      subjectName: 'Data Structures & Algorithms',
      subjectCode: 'CS301',
      credits: 4,
      examDate: '2025-11-15',
      examTime: '10:00 AM',
      duration: 180,
      totalMarks: 100,
      passingMarks: 40,
      preparationStatus: 75,
      studyHours: 45,
      targetScore: 85,
      lastYearScore: 78,
      difficulty: 'hard',
      examType: 'both',
      syllabus: [
        {
          unitNumber: 1,
          unitName: 'Arrays and Linked Lists',
          topics: ['Static Arrays', 'Dynamic Arrays', 'Singly Linked Lists', 'Doubly Linked Lists'],
          completed: true,
          weightage: 25
        },
        {
          unitNumber: 2,
          unitName: 'Stacks and Queues',
          topics: ['Stack Operations', 'Queue Operations', 'Priority Queues', 'Applications'],
          completed: true,
          weightage: 20
        },
        {
          unitNumber: 3,
          unitName: 'Trees and Graphs',
          topics: ['Binary Trees', 'BST', 'Graph Traversals', 'Shortest Path'],
          completed: false,
          weightage: 30
        },
        {
          unitNumber: 4,
          unitName: 'Advanced Topics',
          topics: ['Dynamic Programming', 'Greedy Algorithms', 'Complexity Analysis'],
          completed: false,
          weightage: 25
        }
      ],
      materials: [
        { id: '1', title: 'DSA Complete Notes', type: 'notes', completed: true, timeSpent: 12 },
        { id: '2', title: 'Algorithm Video Lectures', type: 'video', completed: false, timeSpent: 8 },
        { id: '3', title: 'Coding Practice Problems', type: 'practice', completed: false, timeSpent: 15 },
        { id: '4', title: 'Mock Test Series', type: 'mock_test', completed: false, timeSpent: 5 }
      ]
    },
    {
      id: '2',
      subjectName: 'Database Management Systems',
      subjectCode: 'CS302',
      credits: 3,
      examDate: '2025-11-18',
      examTime: '02:00 PM',
      duration: 180,
      totalMarks: 100,
      passingMarks: 40,
      preparationStatus: 60,
      studyHours: 28,
      targetScore: 80,
      lastYearScore: 72,
      difficulty: 'medium',
      examType: 'theory',
      syllabus: [
        {
          unitNumber: 1,
          unitName: 'Database Fundamentals',
          topics: ['DBMS Architecture', 'ER Modeling', 'Relational Model'],
          completed: true,
          weightage: 20
        },
        {
          unitNumber: 2,
          unitName: 'SQL and Queries',
          topics: ['Basic SQL', 'Joins', 'Subqueries', 'Stored Procedures'],
          completed: true,
          weightage: 35
        },
        {
          unitNumber: 3,
          unitName: 'Normalization',
          topics: ['1NF, 2NF, 3NF', 'BCNF', 'Functional Dependencies'],
          completed: false,
          weightage: 25
        },
        {
          unitNumber: 4,
          unitName: 'Transaction Management',
          topics: ['ACID Properties', 'Concurrency Control', 'Recovery'],
          completed: false,
          weightage: 20
        }
      ],
      materials: [
        { id: '1', title: 'Database Theory Notes', type: 'notes', completed: true, timeSpent: 10 },
        { id: '2', title: 'SQL Practice Lab', type: 'practice', completed: true, timeSpent: 12 },
        { id: '3', title: 'DBMS Video Course', type: 'video', completed: false, timeSpent: 6 }
      ]
    },
    {
      id: '3',
      subjectName: 'Machine Learning',
      subjectCode: 'CS303',
      credits: 4,
      examDate: '2025-11-22',
      examTime: '10:00 AM',
      duration: 180,
      totalMarks: 100,
      passingMarks: 40,
      preparationStatus: 45,
      studyHours: 22,
      targetScore: 90,
      difficulty: 'hard',
      examType: 'both',
      syllabus: [
        {
          unitNumber: 1,
          unitName: 'Introduction to ML',
          topics: ['Types of Learning', 'Model Evaluation', 'Cross Validation'],
          completed: true,
          weightage: 15
        },
        {
          unitNumber: 2,
          unitName: 'Supervised Learning',
          topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'SVM'],
          completed: false,
          weightage: 40
        },
        {
          unitNumber: 3,
          unitName: 'Unsupervised Learning',
          topics: ['K-Means', 'Hierarchical Clustering', 'PCA'],
          completed: false,
          weightage: 25
        },
        {
          unitNumber: 4,
          unitName: 'Advanced Topics',
          topics: ['Neural Networks', 'Deep Learning', 'Ensemble Methods'],
          completed: false,
          weightage: 20
        }
      ],
      materials: [
        { id: '1', title: 'ML Theory Guide', type: 'notes', completed: true, timeSpent: 8 },
        { id: '2', title: 'Python ML Tutorials', type: 'video', completed: false, timeSpent: 10 },
        { id: '3', title: 'Kaggle Practice', type: 'practice', completed: false, timeSpent: 4 }
      ]
    },
    {
      id: '4',
      subjectName: 'Web Technologies',
      subjectCode: 'CS304',
      credits: 3,
      examDate: '2025-11-25',
      examTime: '10:00 AM',
      duration: 180,
      totalMarks: 100,
      passingMarks: 40,
      preparationStatus: 85,
      studyHours: 35,
      targetScore: 88,
      lastYearScore: 82,
      difficulty: 'medium',
      examType: 'practical',
      syllabus: [
        {
          unitNumber: 1,
          unitName: 'HTML & CSS',
          topics: ['HTML5', 'CSS3', 'Responsive Design', 'Bootstrap'],
          completed: true,
          weightage: 25
        },
        {
          unitNumber: 2,
          unitName: 'JavaScript',
          topics: ['ES6+', 'DOM Manipulation', 'AJAX', 'Promises'],
          completed: true,
          weightage: 30
        },
        {
          unitNumber: 3,
          unitName: 'Frontend Frameworks',
          topics: ['React Basics', 'Components', 'State Management'],
          completed: true,
          weightage: 25
        },
        {
          unitNumber: 4,
          unitName: 'Backend Development',
          topics: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
          completed: false,
          weightage: 20
        }
      ],
      materials: [
        { id: '1', title: 'Web Dev Complete Guide', type: 'notes', completed: true, timeSpent: 15 },
        { id: '2', title: 'React Project Tutorial', type: 'video', completed: true, timeSpent: 18 },
        { id: '3', title: 'Full Stack Projects', type: 'practice', completed: true, timeSpent: 12 }
      ]
    },
    {
      id: '5',
      subjectName: 'Software Engineering',
      subjectCode: 'CS305',
      credits: 3,
      examDate: '2025-11-28',
      examTime: '02:00 PM',
      duration: 180,
      totalMarks: 100,
      passingMarks: 40,
      preparationStatus: 55,
      studyHours: 20,
      targetScore: 75,
      lastYearScore: 68,
      difficulty: 'easy',
      examType: 'theory',
      syllabus: [
        {
          unitNumber: 1,
          unitName: 'SDLC Models',
          topics: ['Waterfall', 'Agile', 'Spiral', 'DevOps'],
          completed: true,
          weightage: 30
        },
        {
          unitNumber: 2,
          unitName: 'Requirements Engineering',
          topics: ['Requirement Gathering', 'Analysis', 'Documentation'],
          completed: true,
          weightage: 25
        },
        {
          unitNumber: 3,
          unitName: 'Design Patterns',
          topics: ['Creational', 'Structural', 'Behavioral'],
          completed: false,
          weightage: 25
        },
        {
          unitNumber: 4,
          unitName: 'Testing & Maintenance',
          topics: ['Testing Levels', 'Test Cases', 'Maintenance Types'],
          completed: false,
          weightage: 20
        }
      ],
      materials: [
        { id: '1', title: 'SE Comprehensive Notes', type: 'notes', completed: true, timeSpent: 12 },
        { id: '2', title: 'Case Study Analysis', type: 'practice', completed: false, timeSpent: 6 },
        { id: '3', title: 'Previous Year Papers', type: 'mock_test', completed: false, timeSpent: 2 }
      ]
    }
  ]);

  // Sample study plan data
  const [studyPlan] = useState<StudyPlan[]>([
    {
      date: '2025-10-01',
      subject: 'Data Structures & Algorithms',
      topics: ['Trees', 'Graph Traversals'],
      targetHours: 4,
      actualHours: 3.5,
      completed: true
    },
    {
      date: '2025-10-02',
      subject: 'Database Management Systems',
      topics: ['Normalization', 'BCNF'],
      targetHours: 3,
      actualHours: 3,
      completed: true
    },
    {
      date: '2025-10-03',
      subject: 'Machine Learning',
      topics: ['Decision Trees', 'Random Forest'],
      targetHours: 4,
      actualHours: 2,
      completed: false
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

  const filteredSubjects = examSubjects.filter(subject => {
    const matchesSearch = searchTerm === '' || 
      subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === '' || subject.difficulty === difficultyFilter;
    const matchesType = typeFilter === '' || subject.examType === typeFilter;
    
    return matchesSearch && matchesDifficulty && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'hard': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="w-4 h-4" />;
      case 'practical': return <Brain className="w-4 h-4" />;
      case 'both': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getDaysUntilExam = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = (subject: ExamSubject) => {
    setSelectedSubject(subject);
    setShowDetailModal(true);
  };

  const summaryStats = {
    totalSubjects: examSubjects.length,
    averagePreparation: Math.round(examSubjects.reduce((acc, s) => acc + s.preparationStatus, 0) / examSubjects.length),
    totalStudyHours: examSubjects.reduce((acc, s) => acc + s.studyHours, 0),
    highPriority: examSubjects.filter(s => getDaysUntilExam(s.examDate) <= 10).length,
    completedUnits: examSubjects.reduce((acc, s) => acc + s.syllabus.filter(u => u.completed).length, 0),
    totalUnits: examSubjects.reduce((acc, s) => acc + s.syllabus.length, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-500" />
            Semester Exam Preparation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your exam preparation progress, study plans, and readiness for upcoming semester exams
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
              <p className="text-blue-100 text-sm font-medium">Total Subjects</p>
              <p className="text-2xl font-bold">{summaryStats.totalSubjects}</p>
            </div>
            <BookOpen className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Avg Progress</p>
              <p className="text-2xl font-bold">{summaryStats.averagePreparation}%</p>
            </div>
            <TrendingUp className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Study Hours</p>
              <p className="text-2xl font-bold">{summaryStats.totalStudyHours}</p>
            </div>
            <Clock className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">High Priority</p>
              <p className="text-2xl font-bold">{summaryStats.highPriority}</p>
            </div>
            <AlertTriangle className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Units Done</p>
              <p className="text-2xl font-bold">{summaryStats.completedUnits}/{summaryStats.totalUnits}</p>
            </div>
            <CheckCircle className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Avg Target</p>
              <p className="text-2xl font-bold">{Math.round(examSubjects.reduce((acc, s) => acc + s.targetScore, 0) / examSubjects.length)}</p>
            </div>
            <Award className="w-6 h-6 opacity-80" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'overview', label: 'Subject Overview', icon: BookOpen },
            { id: 'schedule', label: 'Exam Schedule', icon: Calendar },
            { id: 'progress', label: 'Progress Tracking', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="theory">Theory</option>
                <option value="practical">Practical</option>
                <option value="both">Both</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setDifficultyFilter('');
                  setTypeFilter('');
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
                        {subject.difficulty.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                        {getTypeIcon(subject.examType)}
                        <span>{subject.examType.toUpperCase()}</span>
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getDaysUntilExam(subject.examDate) <= 7 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                      getDaysUntilExam(subject.examDate) <= 14 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                    }`}>
                      {getDaysUntilExam(subject.examDate)} days left
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {subject.subjectName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {subject.subjectCode} • {subject.credits} Credits
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="space-y-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Preparation Progress</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{subject.preparationStatus}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(subject.preparationStatus)}`}
                        style={{ width: `${subject.preparationStatus}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Exam Date</p>
                          <p className="font-medium">{new Date(subject.examDate).toLocaleDateString('en-IN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Timer className="w-4 h-4 text-purple-500" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Duration</p>
                          <p className="font-medium">{subject.duration} mins</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Study Hours</p>
                          <p className="font-medium">{subject.studyHours}h</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Target</p>
                          <p className="font-medium">{subject.targetScore}%</p>
                        </div>
                      </div>
                    </div>

                    {subject.lastYearScore && (
                      <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-700 dark:text-blue-300">Last Year Score:</span>
                          <span className="font-bold text-blue-800 dark:text-blue-200">{subject.lastYearScore}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(subject)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            Exam Schedule
          </h2>
          <div className="space-y-4">
            {examSubjects.sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()).map((subject) => (
              <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    getDaysUntilExam(subject.examDate) <= 7 ? 'bg-red-500' :
                    getDaysUntilExam(subject.examDate) <= 14 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold">{subject.subjectName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{subject.subjectCode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{new Date(subject.examDate).toLocaleDateString('en-IN')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{subject.examTime}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{getDaysUntilExam(subject.examDate)} days</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{subject.duration} mins</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
              Progress Overview
            </h2>
            <div className="space-y-4">
              {examSubjects.map((subject) => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject.subjectName}</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{subject.preparationStatus}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(subject.preparationStatus)}`}
                      style={{ width: `${subject.preparationStatus}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-500" />
              Recent Study Plan
            </h2>
            <div className="space-y-4">
              {studyPlan.map((plan, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  plan.completed ? 'bg-green-50 dark:bg-green-900 border-green-500' : 'bg-yellow-50 dark:bg-yellow-900 border-yellow-500'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{plan.subject}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      plan.completed ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}>
                      {plan.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Topics: {plan.topics.join(', ')}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress: {plan.actualHours}/{plan.targetHours} hours</span>
                    <span>{new Date(plan.date).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedSubject.subjectName} - Exam Preparation
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
                    <h3 className="text-lg font-semibold mb-4">Syllabus Coverage</h3>
                    <div className="space-y-3">
                      {selectedSubject.syllabus.map((unit) => (
                        <div key={unit.unitNumber} className={`p-4 rounded-lg border ${
                          unit.completed ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Unit {unit.unitNumber}: {unit.unitName}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">
                                {unit.weightage}%
                              </span>
                              {unit.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <Clock className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Topics: {unit.topics.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Exam Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Subject Code:</span>
                        <span className="font-medium">{selectedSubject.subjectCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credits:</span>
                        <span className="font-medium">{selectedSubject.credits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exam Date:</span>
                        <span className="font-medium">{new Date(selectedSubject.examDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exam Time:</span>
                        <span className="font-medium">{selectedSubject.examTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{selectedSubject.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Marks:</span>
                        <span className="font-medium">{selectedSubject.totalMarks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passing Marks:</span>
                        <span className="font-medium">{selectedSubject.passingMarks}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Study Resources</h4>
                    <div className="space-y-2">
                      {selectedSubject.materials.map((material) => (
                        <div key={material.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {material.type === 'notes' && <FileText className="w-4 h-4 text-blue-500" />}
                            {material.type === 'video' && <Video className="w-4 h-4 text-red-500" />}
                            {material.type === 'practice' && <Brain className="w-4 h-4 text-green-500" />}
                            {material.type === 'mock_test' && <Target className="w-4 h-4 text-purple-500" />}
                            <div>
                              <p className="text-sm font-medium">{material.title}</p>
                              <p className="text-xs text-gray-500">Time spent: {material.timeSpent}h</p>
                            </div>
                          </div>
                          {material.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Preparation Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Overall Progress:</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{selectedSubject.preparationStatus}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Study Hours:</span>
                        <span className="font-medium">{selectedSubject.studyHours} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Target Score:</span>
                        <span className="font-medium">{selectedSubject.targetScore}%</span>
                      </div>
                      {selectedSubject.lastYearScore && (
                        <div className="flex justify-between">
                          <span>Last Year Score:</span>
                          <span className="font-medium">{selectedSubject.lastYearScore}%</span>
                        </div>
                      )}
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
                Update Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSemExamPreparation;
