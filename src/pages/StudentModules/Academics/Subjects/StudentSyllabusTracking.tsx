import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Clock,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  Target,
  BarChart3,
  FileText,
  PlayCircle,
  Award,
  User,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SyllabusSubject {
  id: string;
  subjectName: string;
  subjectCode: string;
  faculty: string;
  semester: string;
  credits: number;
  totalUnits: number;
  completedUnits: number;
  overallProgress: number;
  units: SyllabusUnit[];
  lastUpdated: string;
  examDate: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SyllabusUnit {
  unitNumber: number;
  unitName: string;
  totalTopics: number;
  completedTopics: number;
  progress: number;
  topics: Topic[];
  estimatedHours: number;
  actualHours: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'revision';
  startDate?: string;
  completedDate?: string;
  weightage: number;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  completedDate?: string;
  estimatedTime: number;
  actualTime: number;
  resources: TopicResource[];
  notes: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TopicResource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'link' | 'practice';
  url: string;
  isCompleted: boolean;
  duration?: number;
}

const StudentSyllabusTracking: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<SyllabusSubject | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(new Set());

  // Sample syllabus data
  const [syllabusData] = useState<SyllabusSubject[]>([
    {
      id: '1',
      subjectName: 'Data Structures & Algorithms',
      subjectCode: 'CS301',
      faculty: 'Dr. Rajesh Kumar',
      semester: 'Semester 5',
      credits: 4,
      totalUnits: 4,
      completedUnits: 2,
      overallProgress: 65,
      lastUpdated: '2025-09-27',
      examDate: '2025-11-15',
      difficulty: 'hard',
      units: [
        {
          unitNumber: 1,
          unitName: 'Arrays and Linked Lists',
          totalTopics: 5,
          completedTopics: 5,
          progress: 100,
          estimatedHours: 12,
          actualHours: 14,
          status: 'completed',
          startDate: '2025-08-15',
          completedDate: '2025-09-02',
          weightage: 25,
          topics: [
            {
              id: '1',
              name: 'Array Operations',
              description: 'Basic array operations, traversal, insertion, deletion',
              isCompleted: true,
              completedDate: '2025-08-18',
              estimatedTime: 3,
              actualTime: 3.5,
              difficulty: 'easy',
              notes: 'Clear understanding of basic operations',
              resources: [
                { id: '1', title: 'Array Basics Video', type: 'video', url: '#', isCompleted: true, duration: 45 },
                { id: '2', title: 'Array Practice Problems', type: 'practice', url: '#', isCompleted: true }
              ]
            },
            {
              id: '2',
              name: 'Dynamic Arrays',
              description: 'Vector implementation, resizing strategies',
              isCompleted: true,
              completedDate: '2025-08-22',
              estimatedTime: 2,
              actualTime: 2,
              difficulty: 'medium',
              notes: 'Good grasp of dynamic memory allocation',
              resources: [
                { id: '1', title: 'Dynamic Arrays PDF', type: 'pdf', url: '#', isCompleted: true }
              ]
            },
            {
              id: '3',
              name: 'Singly Linked Lists',
              description: 'Implementation of singly linked lists',
              isCompleted: true,
              completedDate: '2025-08-28',
              estimatedTime: 4,
              actualTime: 4.5,
              difficulty: 'medium',
              notes: 'Need more practice with pointer manipulation',
              resources: [
                { id: '1', title: 'Linked List Tutorial', type: 'video', url: '#', isCompleted: true, duration: 60 },
                { id: '2', title: 'Implementation Guide', type: 'pdf', url: '#', isCompleted: true }
              ]
            },
            {
              id: '4',
              name: 'Doubly Linked Lists',
              description: 'Implementation and operations on doubly linked lists',
              isCompleted: true,
              completedDate: '2025-09-01',
              estimatedTime: 2,
              actualTime: 2,
              difficulty: 'medium',
              notes: 'Good understanding achieved',
              resources: []
            },
            {
              id: '5',
              name: 'Circular Linked Lists',
              description: 'Circular variations of linked lists',
              isCompleted: true,
              completedDate: '2025-09-02',
              estimatedTime: 1,
              actualTime: 1,
              difficulty: 'easy',
              notes: 'Simple extension of basic linked lists',
              resources: []
            }
          ]
        },
        {
          unitNumber: 2,
          unitName: 'Stacks and Queues',
          totalTopics: 4,
          completedTopics: 3,
          progress: 75,
          estimatedHours: 8,
          actualHours: 7,
          status: 'in_progress',
          startDate: '2025-09-03',
          weightage: 20,
          topics: [
            {
              id: '6',
              name: 'Stack Implementation',
              description: 'Array and linked list based stack implementation',
              isCompleted: true,
              completedDate: '2025-09-08',
              estimatedTime: 2,
              actualTime: 2,
              difficulty: 'easy',
              notes: 'Both implementations mastered',
              resources: [
                { id: '1', title: 'Stack Operations', type: 'video', url: '#', isCompleted: true, duration: 30 }
              ]
            },
            {
              id: '7',
              name: 'Queue Implementation',
              description: 'Array and linked list based queue implementation',
              isCompleted: true,
              completedDate: '2025-09-12',
              estimatedTime: 2,
              actualTime: 2,
              difficulty: 'easy',
              notes: 'Clear understanding of FIFO principle',
              resources: []
            },
            {
              id: '8',
              name: 'Priority Queue',
              description: 'Heap-based priority queue implementation',
              isCompleted: true,
              completedDate: '2025-09-20',
              estimatedTime: 3,
              actualTime: 3,
              difficulty: 'medium',
              notes: 'Heap operations need more practice',
              resources: [
                { id: '1', title: 'Priority Queue Guide', type: 'pdf', url: '#', isCompleted: true }
              ]
            },
            {
              id: '9',
              name: 'Applications',
              description: 'Real-world applications of stacks and queues',
              isCompleted: false,
              estimatedTime: 1,
              actualTime: 0,
              difficulty: 'easy',
              notes: '',
              resources: []
            }
          ]
        },
        {
          unitNumber: 3,
          unitName: 'Trees and Binary Trees',
          totalTopics: 6,
          completedTopics: 2,
          progress: 33,
          estimatedHours: 15,
          actualHours: 6,
          status: 'in_progress',
          startDate: '2025-09-21',
          weightage: 30,
          topics: [
            {
              id: '10',
              name: 'Tree Terminology',
              description: 'Basic tree concepts and terminology',
              isCompleted: true,
              completedDate: '2025-09-23',
              estimatedTime: 1,
              actualTime: 1,
              difficulty: 'easy',
              notes: 'Good foundation established',
              resources: []
            },
            {
              id: '11',
              name: 'Binary Tree Implementation',
              description: 'Node structure and basic operations',
              isCompleted: true,
              completedDate: '2025-09-26',
              estimatedTime: 3,
              actualTime: 3,
              difficulty: 'medium',
              notes: 'Implementation completed successfully',
              resources: [
                { id: '1', title: 'Binary Tree Code', type: 'practice', url: '#', isCompleted: true }
              ]
            },
            {
              id: '12',
              name: 'Tree Traversals',
              description: 'Inorder, preorder, postorder, level-order traversals',
              isCompleted: false,
              estimatedTime: 4,
              actualTime: 2,
              difficulty: 'medium',
              notes: 'Currently working on recursive implementations',
              resources: []
            },
            {
              id: '13',
              name: 'Binary Search Trees',
              description: 'BST properties and operations',
              isCompleted: false,
              estimatedTime: 4,
              actualTime: 0,
              difficulty: 'medium',
              notes: '',
              resources: []
            },
            {
              id: '14',
              name: 'AVL Trees',
              description: 'Self-balancing binary search trees',
              isCompleted: false,
              estimatedTime: 2,
              actualTime: 0,
              difficulty: 'hard',
              notes: '',
              resources: []
            },
            {
              id: '15',
              name: 'Tree Applications',
              description: 'Expression trees, decision trees',
              isCompleted: false,
              estimatedTime: 1,
              actualTime: 0,
              difficulty: 'medium',
              notes: '',
              resources: []
            }
          ]
        },
        {
          unitNumber: 4,
          unitName: 'Graphs and Advanced Topics',
          totalTopics: 5,
          completedTopics: 0,
          progress: 0,
          estimatedHours: 20,
          actualHours: 0,
          status: 'not_started',
          weightage: 25,
          topics: [
            {
              id: '16',
              name: 'Graph Representation',
              description: 'Adjacency matrix and adjacency list',
              isCompleted: false,
              estimatedTime: 3,
              actualTime: 0,
              difficulty: 'medium',
              notes: '',
              resources: []
            },
            {
              id: '17',
              name: 'Graph Traversals',
              description: 'BFS and DFS algorithms',
              isCompleted: false,
              estimatedTime: 5,
              actualTime: 0,
              difficulty: 'medium',
              notes: '',
              resources: []
            },
            {
              id: '18',
              name: 'Shortest Path Algorithms',
              description: 'Dijkstra\'s and Floyd-Warshall algorithms',
              isCompleted: false,
              estimatedTime: 6,
              actualTime: 0,
              difficulty: 'hard',
              notes: '',
              resources: []
            },
            {
              id: '19',
              name: 'Minimum Spanning Tree',
              description: 'Prim\'s and Kruskal\'s algorithms',
              isCompleted: false,
              estimatedTime: 4,
              actualTime: 0,
              difficulty: 'hard',
              notes: '',
              resources: []
            },
            {
              id: '20',
              name: 'Dynamic Programming',
              description: 'DP concepts and classic problems',
              isCompleted: false,
              estimatedTime: 2,
              actualTime: 0,
              difficulty: 'hard',
              notes: '',
              resources: []
            }
          ]
        }
      ]
    },
    {
      id: '2',
      subjectName: 'Database Management Systems',
      subjectCode: 'CS302',
      faculty: 'Prof. Priya Sharma',
      semester: 'Semester 5',
      credits: 3,
      totalUnits: 4,
      completedUnits: 3,
      overallProgress: 82,
      lastUpdated: '2025-09-25',
      examDate: '2025-11-18',
      difficulty: 'medium',
      units: [
        {
          unitNumber: 1,
          unitName: 'Database Fundamentals',
          totalTopics: 4,
          completedTopics: 4,
          progress: 100,
          estimatedHours: 8,
          actualHours: 8,
          status: 'completed',
          startDate: '2025-08-10',
          completedDate: '2025-08-25',
          weightage: 20,
          topics: []
        },
        {
          unitNumber: 2,
          unitName: 'SQL and Queries',
          totalTopics: 5,
          completedTopics: 5,
          progress: 100,
          estimatedHours: 12,
          actualHours: 14,
          status: 'completed',
          startDate: '2025-08-26',
          completedDate: '2025-09-10',
          weightage: 35,
          topics: []
        },
        {
          unitNumber: 3,
          unitName: 'Normalization',
          totalTopics: 3,
          completedTopics: 3,
          progress: 100,
          estimatedHours: 10,
          actualHours: 9,
          status: 'completed',
          startDate: '2025-09-11',
          completedDate: '2025-09-22',
          weightage: 25,
          topics: []
        },
        {
          unitNumber: 4,
          unitName: 'Transaction Management',
          totalTopics: 4,
          completedTopics: 1,
          progress: 25,
          estimatedHours: 8,
          actualHours: 2,
          status: 'in_progress',
          startDate: '2025-09-23',
          weightage: 20,
          topics: []
        }
      ]
    },
    {
      id: '3',
      subjectName: 'Web Technologies',
      subjectCode: 'CS304',
      faculty: 'Ms. Kavya Singh',
      semester: 'Semester 5',
      credits: 3,
      totalUnits: 4,
      completedUnits: 4,
      overallProgress: 95,
      lastUpdated: '2025-09-26',
      examDate: '2025-11-25',
      difficulty: 'easy',
      units: [
        {
          unitNumber: 1,
          unitName: 'HTML & CSS',
          totalTopics: 4,
          completedTopics: 4,
          progress: 100,
          estimatedHours: 10,
          actualHours: 9,
          status: 'completed',
          weightage: 25,
          topics: []
        },
        {
          unitNumber: 2,
          unitName: 'JavaScript',
          totalTopics: 5,
          completedTopics: 5,
          progress: 100,
          estimatedHours: 15,
          actualHours: 16,
          status: 'completed',
          weightage: 30,
          topics: []
        },
        {
          unitNumber: 3,
          unitName: 'Frontend Frameworks',
          totalTopics: 3,
          completedTopics: 3,
          progress: 100,
          estimatedHours: 12,
          actualHours: 12,
          status: 'completed',
          weightage: 25,
          topics: []
        },
        {
          unitNumber: 4,
          unitName: 'Backend Development',
          totalTopics: 4,
          completedTopics: 3,
          progress: 75,
          estimatedHours: 10,
          actualHours: 8,
          status: 'revision',
          weightage: 20,
          topics: []
        }
      ]
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

  const filteredSubjects = syllabusData.filter(subject => {
    const matchesSearch = searchTerm === '' || 
      subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || 
      (statusFilter === 'completed' && subject.overallProgress === 100) ||
      (statusFilter === 'in_progress' && subject.overallProgress > 0 && subject.overallProgress < 100) ||
      (statusFilter === 'not_started' && subject.overallProgress === 0);
    
    const matchesDifficulty = difficultyFilter === '' || subject.difficulty === difficultyFilter;
    
    return matchesSearch && matchesStatus && matchesDifficulty;
  });

  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100';
      case 'revision': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100';
      case 'not_started': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
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

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleViewDetails = (subject: SyllabusSubject) => {
    setSelectedSubject(subject);
    setShowDetailModal(true);
  };

  const handleToggleUnit = (unitNumber: number) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitNumber)) {
      newExpanded.delete(unitNumber);
    } else {
      newExpanded.add(unitNumber);
    }
    setExpandedUnits(newExpanded);
  };

  const markTopicComplete = (topicId: string) => {
    // This would typically make an API call to update the topic status
    console.log('Marking topic as complete:', topicId);
  };

  const summaryStats = {
    totalSubjects: syllabusData.length,
    averageProgress: Math.round(syllabusData.reduce((acc, s) => acc + s.overallProgress, 0) / syllabusData.length),
    completedSubjects: syllabusData.filter(s => s.overallProgress === 100).length,
    totalUnits: syllabusData.reduce((acc, s) => acc + s.totalUnits, 0),
    completedUnits: syllabusData.reduce((acc, s) => acc + s.completedUnits, 0),
    totalHours: syllabusData.reduce((acc, s) => acc + s.units.reduce((unitAcc, u) => unitAcc + u.actualHours, 0), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-blue-500" />
            Syllabus Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your progress through course syllabi and track completion of units and topics
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
              <p className="text-2xl font-bold">{summaryStats.averageProgress}%</p>
            </div>
            <TrendingUp className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold">{summaryStats.completedSubjects}</p>
            </div>
            <CheckCircle className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Units Done</p>
              <p className="text-2xl font-bold">{summaryStats.completedUnits}/{summaryStats.totalUnits}</p>
            </div>
            <Target className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Study Hours</p>
              <p className="text-2xl font-bold">{summaryStats.totalHours}</p>
            </div>
            <Clock className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Efficiency</p>
              <p className="text-2xl font-bold">{Math.round((summaryStats.completedUnits / summaryStats.totalUnits) * 100)}%</p>
            </div>
            <Award className="w-6 h-6 opacity-80" />
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
              placeholder="Search subjects..."
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
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
            <option value="not_started">Not Started</option>
          </select>

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

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setDifficultyFilter('');
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
                  <span className="text-xs text-gray-500 dark:text-gray-400">{subject.semester}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {subject.credits} Credits
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {subject.subjectName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {subject.subjectCode} • {subject.faculty}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{subject.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(subject.overallProgress)}`}
                    style={{ width: `${subject.overallProgress}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Units</p>
                      <p className="font-medium">{subject.completedUnits}/{subject.totalUnits}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Exam</p>
                      <p className="font-medium">{new Date(subject.examDate).toLocaleDateString('en-IN', {month: 'short', day: 'numeric'})}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Updated</p>
                      <p className="font-medium">{new Date(subject.lastUpdated).toLocaleDateString('en-IN', {month: 'short', day: 'numeric'})}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Hours</p>
                      <p className="font-medium">{subject.units.reduce((acc, u) => acc + u.actualHours, 0)}h</p>
                    </div>
                  </div>
                </div>

                {/* Unit Progress Bars */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Unit Progress:</p>
                  {subject.units.map((unit) => (
                    <div key={unit.unitNumber} className="flex items-center space-x-2">
                      <span className="text-xs w-6 text-gray-500">U{unit.unitNumber}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${getProgressColor(unit.progress)}`}
                          style={{ width: `${unit.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs w-10 text-right text-gray-600 dark:text-gray-400">{unit.progress}%</span>
                    </div>
                  ))}
                </div>
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
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedSubject.subjectName} - Syllabus Progress
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Unit Progress Details</h3>
                  <div className="space-y-4">
                    {selectedSubject.units.map((unit) => (
                      <div key={unit.unitNumber} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div 
                          className="p-4 bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                          onClick={() => handleToggleUnit(unit.unitNumber)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {expandedUnits.has(unit.unitNumber) ? 
                                <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                              }
                              <h4 className="font-medium">Unit {unit.unitNumber}: {unit.unitName}</h4>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUnitStatusColor(unit.status)}`}>
                                {unit.status.replace('_', ' ').toUpperCase()}
                              </span>
                              <span className="text-sm font-medium">{unit.progress}%</span>
                            </div>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(unit.progress)}`}
                              style={{ width: `${unit.progress}%` }}
                            ></div>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Topics: {unit.completedTopics}/{unit.totalTopics}</span>
                            <span>Hours: {unit.actualHours}/{unit.estimatedHours}</span>
                            <span>Weight: {unit.weightage}%</span>
                          </div>
                        </div>
                        
                        {expandedUnits.has(unit.unitNumber) && unit.topics.length > 0 && (
                          <div className="p-4 space-y-3">
                            {unit.topics.map((topic) => (
                              <div key={topic.id} className={`p-3 rounded-lg border ${
                                topic.isCompleted ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600'
                              }`}>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <h5 className="font-medium text-sm">{topic.name}</h5>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                                        {topic.difficulty}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                      {topic.description}
                                    </p>
                                    {topic.notes && (
                                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 italic">
                                        Note: {topic.notes}
                                      </p>
                                    )}
                                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                                      <span>Est: {topic.estimatedTime}h</span>
                                      <span>Actual: {topic.actualTime}h</span>
                                      {topic.completedDate && (
                                        <span>Completed: {new Date(topic.completedDate).toLocaleDateString('en-IN')}</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {topic.isCompleted ? (
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <button
                                        onClick={() => markTopicComplete(topic.id)}
                                        className="p-1 text-gray-400 hover:text-green-500 transition-colors duration-200"
                                      >
                                        <Clock className="w-5 h-5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                                
                                {topic.resources.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Resources:</p>
                                    {topic.resources.map((resource) => (
                                      <div key={resource.id} className="flex items-center space-x-2 text-xs">
                                        {resource.type === 'video' && <PlayCircle className="w-3 h-3 text-red-500" />}
                                        {resource.type === 'pdf' && <FileText className="w-3 h-3 text-blue-500" />}
                                        {resource.type === 'link' && <Eye className="w-3 h-3 text-green-500" />}
                                        {resource.type === 'practice' && <Target className="w-3 h-3 text-purple-500" />}
                                        <span className={resource.isCompleted ? 'line-through text-gray-500' : ''}>{resource.title}</span>
                                        {resource.duration && <span className="text-gray-500">({resource.duration}min)</span>}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Subject Overview</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Subject Code:</span>
                        <span className="font-medium">{selectedSubject.subjectCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Faculty:</span>
                        <span className="font-medium">{selectedSubject.faculty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credits:</span>
                        <span className="font-medium">{selectedSubject.credits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Semester:</span>
                        <span className="font-medium">{selectedSubject.semester}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exam Date:</span>
                        <span className="font-medium">{new Date(selectedSubject.examDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Progress Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Overall Progress:</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{selectedSubject.overallProgress}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Units Completed:</span>
                        <span className="font-medium">{selectedSubject.completedUnits}/{selectedSubject.totalUnits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Study Hours:</span>
                        <span className="font-medium">{selectedSubject.units.reduce((acc, u) => acc + u.actualHours, 0)}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <span className="font-medium">{new Date(selectedSubject.lastUpdated).toLocaleDateString('en-IN')}</span>
                      </div>
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

export default StudentSyllabusTracking;
