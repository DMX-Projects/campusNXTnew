import React, { useState, useEffect } from 'react';
import { 
  FileTextIcon, 
  ClockIcon, 
  UsersIcon, 
  PlusIcon, 
  PlayIcon, 
  EditIcon,
  TrashIcon,
  EyeIcon,
  SearchIcon,
  DownloadIcon,
  BarChart3Icon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrendingUpIcon,
  UserIcon,
  TimerIcon,
  CopyIcon,
} from 'lucide-react';

interface Test {
  id: string;
  title: string;
  subject: string;
  department: string;
  semester: string;
  duration: number;
  totalQuestions: number;
  maxMarks: number;
  createdBy: string;
  createdAt: string;
  scheduledAt: string;
  endAt: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'cancelled';
  participants: number;
  averageScore: number;
  testType: 'quiz' | 'midterm' | 'final' | 'assignment' | 'practice';
  instructions: string;
  passingMarks: number;
  allowRetake: boolean;
  randomizeQuestions: boolean;
  showResults: boolean;
  autoGrade: boolean;
  questions: Question[];
  attempts: TestAttempt[];
}

interface Question {
  id: string;
  type: 'mcq' | 'true-false' | 'short-answer' | 'essay' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  marks: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TestAttempt {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  startTime: string;
  endTime: string;
  score: number;
  answers: StudentAnswer[];
  status: 'in-progress' | 'completed' | 'submitted';
}

interface StudentAnswer {
  questionId: string;
  answer: string | number;
  isCorrect: boolean;
  marksAwarded: number;
}

interface NewTest {
  title: string;
  subject: string;
  department: string;
  semester: string;
  duration: number;
  totalQuestions: number;
  maxMarks: number;
  scheduledAt: string;
  endAt: string;
  testType: 'quiz' | 'midterm' | 'final' | 'assignment' | 'practice';
  instructions: string;
  passingMarks: number;
  allowRetake: boolean;
  randomizeQuestions: boolean;
  showResults: boolean;
  autoGrade: boolean;
}

const OnlineTest: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([
    {
      id: '1',
      title: 'Data Structures - Midterm Examination',
      subject: 'Data Structures',
      department: 'CSE',
      semester: '3',
      duration: 90,
      totalQuestions: 25,
      maxMarks: 100,
      createdBy: 'Dr. Priya Sharma',
      createdAt: '2025-08-20T10:00:00Z',
      scheduledAt: '2025-09-05T10:00:00Z',
      endAt: '2025-09-05T11:30:00Z',
      status: 'scheduled',
      participants: 85,
      averageScore: 0,
      testType: 'midterm',
      instructions: 'Read all questions carefully. No negative marking. Time limit strictly enforced.',
      passingMarks: 40,
      allowRetake: false,
      randomizeQuestions: true,
      showResults: true,
      autoGrade: true,
      questions: [],
      attempts: []
    },
    {
      id: '2',
      title: 'Database Fundamentals Quiz',
      subject: 'DBMS',
      department: 'CSE',
      semester: '4',
      duration: 30,
      totalQuestions: 15,
      maxMarks: 50,
      createdBy: 'Prof. Rajesh Kumar',
      createdAt: '2025-08-18T11:30:00Z',
      scheduledAt: '2025-09-03T14:00:00Z',
      endAt: '2025-09-03T14:30:00Z',
      status: 'active',
      participants: 92,
      averageScore: 0,
      testType: 'quiz',
      instructions: 'Quick assessment quiz. Each question carries equal marks.',
      passingMarks: 25,
      allowRetake: true,
      randomizeQuestions: false,
      showResults: true,
      autoGrade: true,
      questions: [],
      attempts: []
    },
    {
      id: '3',
      title: 'Software Engineering Final Examination',
      subject: 'Software Engineering',
      department: 'CSE',
      semester: '5',
      duration: 180,
      totalQuestions: 40,
      maxMarks: 200,
      createdBy: 'Dr. Anita Gupta',
      createdAt: '2025-08-15T09:00:00Z',
      scheduledAt: '2025-08-30T09:00:00Z',
      endAt: '2025-08-30T12:00:00Z',
      status: 'completed',
      participants: 78,
      averageScore: 142,
      testType: 'final',
      instructions: 'Comprehensive final examination. Answer all questions. Good luck!',
      passingMarks: 80,
      allowRetake: false,
      randomizeQuestions: true,
      showResults: false,
      autoGrade: true,
      questions: [],
      attempts: []
    }
  ]);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTestType, setSelectedTestType] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'scheduledAt' | 'participants' | 'averageScore'>('scheduledAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isMonitorModalOpen, setIsMonitorModalOpen] = useState(false);

  // Form and selected data states
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [newTest, setNewTest] = useState<NewTest>({
    title: '',
    subject: '',
    department: 'CSE',
    semester: '1',
    duration: 60,
    totalQuestions: 10,
    maxMarks: 50,
    scheduledAt: '',
    endAt: '',
    testType: 'quiz',
    instructions: '',
    passingMarks: 25,
    allowRetake: false,
    randomizeQuestions: false,
    showResults: true,
    autoGrade: true
  });

  const [loading, setLoading] = useState(false);
  const [filteredTests, setFilteredTests] = useState<Test[]>(tests);

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const statuses = ['draft', 'scheduled', 'active', 'completed', 'cancelled'];
  const testTypes = ['quiz', 'midterm', 'final', 'assignment', 'practice'];

  // Filter and sort tests
  useEffect(() => {
    let filtered = tests;

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(term) ||
        t.subject.toLowerCase().includes(term) ||
        t.createdBy.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    if (selectedStatus !== 'all') filtered = filtered.filter(t => t.status === selectedStatus);
    if (selectedDepartment !== 'all') filtered = filtered.filter(t => t.department === selectedDepartment);
    if (selectedTestType !== 'all') filtered = filtered.filter(t => t.testType === selectedTestType);

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'scheduledAt':
          comparison = new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
          break;
        case 'participants':
          comparison = a.participants - b.participants;
          break;
        case 'averageScore':
          comparison = a.averageScore - b.averageScore;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredTests(filtered);
  }, [searchTerm, selectedStatus, selectedDepartment, selectedTestType, sortBy, sortOrder, tests]);

  // Helper functions
  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
      active: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-purple-100 text-purple-800 border-purple-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      quiz: 'bg-yellow-100 text-yellow-800',
      midterm: 'bg-orange-100 text-orange-800',
      final: 'bg-red-100 text-red-800',
      assignment: 'bg-indigo-100 text-indigo-800',
      practice: 'bg-green-100 text-green-800'
    };
    return colors[type as keyof typeof colors];
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (scheduledAt: string) => {
    const now = new Date().getTime();
    const testTime = new Date(scheduledAt).getTime();
    const diff = testTime - now;
    
    if (diff <= 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  // CRUD Operations
  const handleCreateTest = () => {
    if (!newTest.title || !newTest.subject || !newTest.scheduledAt) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const test: Test = {
        ...newTest,
        id: Date.now().toString(),
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        status: 'draft',
        participants: 0,
        averageScore: 0,
        questions: [],
        attempts: []
      };

      setTests([...tests, test]);
      resetForm();
      setIsCreateModalOpen(false);
      setLoading(false);
      alert('Test created successfully!');
    }, 500);
  };

  const handleEditTest = () => {
    if (!editingTest) return;

    setLoading(true);
    setTimeout(() => {
      const updatedTests = tests.map(t =>
        t.id === editingTest.id ? { ...editingTest } : t
      );

      setTests(updatedTests);
      setIsEditModalOpen(false);
      setEditingTest(null);
      setLoading(false);
      alert('Test updated successfully!');
    }, 500);
  };

  const handleDeleteTest = () => {
    if (!selectedTest) return;

    setLoading(true);
    setTimeout(() => {
      setTests(tests.filter(t => t.id !== selectedTest.id));
      setIsDeleteModalOpen(false);
      setSelectedTest(null);
      setLoading(false);
      alert('Test deleted successfully!');
    }, 500);
  };

  const handleStartTest = (testId: string) => {
    const updatedTests = tests.map(t =>
      t.id === testId ? { ...t, status: 'active' as const } : t
    );
    setTests(updatedTests);
    alert('Test started successfully!');
  };

  const handleEndTest = (testId: string) => {
    const updatedTests = tests.map(t =>
      t.id === testId ? { ...t, status: 'completed' as const } : t
    );
    setTests(updatedTests);
    alert('Test ended successfully!');
  };

  const resetForm = () => {
    setNewTest({
      title: '',
      subject: '',
      department: 'CSE',
      semester: '1',
      duration: 60,
      totalQuestions: 10,
      maxMarks: 50,
      scheduledAt: '',
      endAt: '',
      testType: 'quiz',
      instructions: '',
      passingMarks: 25,
      allowRetake: false,
      randomizeQuestions: false,
      showResults: true,
      autoGrade: true
    });
  };

  const openEditModal = (test: Test) => {
    setEditingTest(test);
    setNewTest({
      title: test.title,
      subject: test.subject,
      department: test.department,
      semester: test.semester,
      duration: test.duration,
      totalQuestions: test.totalQuestions,
      maxMarks: test.maxMarks,
      scheduledAt: test.scheduledAt,
      endAt: test.endAt,
      testType: test.testType,
      instructions: test.instructions,
      passingMarks: test.passingMarks,
      allowRetake: test.allowRetake,
      randomizeQuestions: test.randomizeQuestions,
      showResults: test.showResults,
      autoGrade: test.autoGrade
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (test: Test) => {
    setSelectedTest(test);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (test: Test) => {
    setSelectedTest(test);
    setIsDeleteModalOpen(true);
  };

  const openQuestionModal = (test: Test) => {
    setSelectedTest(test);
    setIsQuestionModalOpen(true);
  };

  const openResultModal = (test: Test) => {
    setSelectedTest(test);
    setIsResultModalOpen(true);
  };

  const openMonitorModal = (test: Test) => {
    setSelectedTest(test);
    setIsMonitorModalOpen(true);
  };

  const duplicateTest = (test: Test) => {
    const duplicatedTest: Test = {
      ...test,
      id: Date.now().toString(),
      title: `${test.title} (Copy)`,
      status: 'draft',
      participants: 0,
      averageScore: 0,
      createdAt: new Date().toISOString(),
      attempts: []
    };
    setTests([...tests, duplicatedTest]);
    alert('Test duplicated successfully!');
  };

  const exportResults = (testId: string) => {
    const test = tests.find(t => t.id === testId);
    if (!test) return;

    const csvContent = "data:text/csv;charset=utf-8," + 
      "Student Name,Roll Number,Score,Percentage,Status,Start Time,End Time\n" +
      test.attempts.map(attempt => 
        `"${attempt.studentName}","${attempt.rollNumber}",${attempt.score},${((attempt.score / test.maxMarks) * 100).toFixed(2)}%,"${attempt.status}","${formatDateTime(attempt.startTime)}","${formatDateTime(attempt.endTime)}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${test.title}_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedDepartment('all');
    setSelectedTestType('all');
  };

  // Statistics
  const stats = {
    totalTests: tests.length,
    activeTests: tests.filter(t => t.status === 'active').length,
    completedTests: tests.filter(t => t.status === 'completed').length,
    scheduledTests: tests.filter(t => t.status === 'scheduled').length,
    totalParticipants: tests.reduce((sum, t) => sum + t.participants, 0),
    averageScore: tests.length > 0 ? tests.reduce((sum, t) => sum + t.averageScore, 0) / tests.length : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Online Test Management System</h1>
              <p className="text-gray-600 mt-1">Create, schedule, monitor, and analyze online assessments</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Test
              </button>
              <button
                onClick={() => alert('Question Bank opened!')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <BookOpenIcon size={20} />
                Question Bank
              </button>
              {/* <button
                onClick={() => alert('Analytics dashboard opened!')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <BarChart3Icon size={20} />
                Analytics
              </button> */}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tests by title, subject, or creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select
                value={selectedTestType}
                onChange={(e) => setSelectedTestType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {testTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as unknown as 'scheduledAt' | 'title' | 'participants')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="scheduledAt">Scheduled Date</option>
                <option value="title">Title</option>
                <option value="participants">Participants</option>
                <option value="averageScore">Average Score</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 ${viewMode === 'card' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FileTextIcon size={16} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <BarChart3Icon size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTests}</p>
              </div>
              <FileTextIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Tests</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeTests}</p>
              </div>
              <PlayIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-purple-600">{stats.completedTests}</p>
              </div>
              <CheckCircleIcon className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduledTests}</p>
              </div>
              <CalendarIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Participants</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalParticipants}</p>
              </div>
              <UsersIcon className="text-orange-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Score</p>
                <p className="text-2xl font-bold text-red-600">{stats.averageScore.toFixed(1)}</p>
              </div>
              <TrendingUpIcon className="text-red-500" size={24} />
            </div>
          </div>
        </div>

        {/* Tests Display */}
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.title}</h3>
                    <p className="text-sm text-gray-600">{test.subject} • {test.department} - Sem {test.semester}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => openViewModal(test)}
                      className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                    >
                      <EyeIcon size={16} />
                    </button>
                    <button
                      onClick={() => openEditModal(test)}
                      className="text-gray-400 hover:text-green-600 transition-colors p-1"
                    >
                      <EditIcon size={16} />
                    </button>
                    <button
                      onClick={() => duplicateTest(test)}
                      className="text-gray-400 hover:text-purple-600 transition-colors p-1"
                    >
                      <CopyIcon size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(test)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>

                {/* Status and Type Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(test.status)}`}>
                    {test.status.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(test.testType)}`}>
                    {test.testType.toUpperCase()}
                  </span>
                  {test.status === 'scheduled' && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      {getTimeRemaining(test.scheduledAt)}
                    </span>
                  )}
                </div>

                {/* Test Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium flex items-center gap-1">
                      <ClockIcon size={14} />
                      {test.duration} minutes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{test.totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Max Marks:</span>
                    <span className="font-medium">{test.maxMarks}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium">{test.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Scheduled:</span>
                    <span className="font-medium">{formatDateTime(test.scheduledAt)}</span>
                  </div>
                </div>

                {/* Progress Bar for Completed Tests */}
                {test.status === 'completed' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Score</span>
                      <span>{test.averageScore}/{test.maxMarks}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${(test.averageScore / test.maxMarks) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openQuestionModal(test)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm transition-colors"
                  >
                    Questions
                  </button>
                  
                  {test.status === 'completed' ? (
                    <button
                      onClick={() => openResultModal(test)}
                      className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Results
                    </button>
                  ) : test.status === 'active' ? (
                    <button
                      onClick={() => openMonitorModal(test)}
                      className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Monitor
                    </button>
                  ) : test.status === 'scheduled' ? (
                    <button
                      onClick={() => handleStartTest(test.id)}
                      className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Start Test
                    </button>
                  ) : (
                    <button
                      onClick={() => openEditModal(test)}
                      className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Creator Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <UserIcon size={12} />
                    <span>Created by {test.createdBy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tests ({filteredTests.length})
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-900">Test Details</th>
                      <th className="text-left p-3 font-medium text-gray-900">Schedule</th>
                      <th className="text-left p-3 font-medium text-gray-900">Configuration</th>
                      <th className="text-left p-3 font-medium text-gray-900">Participation</th>
                      <th className="text-left p-3 font-medium text-gray-900">Status</th>
                      <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTests.map((test) => (
                      <tr key={test.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900">{test.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(test.testType)}`}>
                                {test.testType.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{test.subject} • {test.department} - Sem {test.semester}</p>
                            <p className="text-xs text-gray-400">By {test.createdBy}</p>
                          </div>
                        </td>
                        <td className="p-3 text-sm">
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <CalendarIcon size={14} className="text-gray-400" />
                              <span>{formatDateTime(test.scheduledAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon size={14} className="text-gray-400" />
                              <span>{test.duration} minutes</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm">
                          <div>
                            <div>{test.totalQuestions} questions</div>
                            <div>{test.maxMarks} marks</div>
                            <div className="text-xs text-gray-500">Passing: {test.passingMarks}</div>
                          </div>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="text-center">
                            <div className="text-lg font-semibold">{test.participants}</div>
                            <div className="text-xs text-gray-500">registered</div>
                            {test.status === 'completed' && (
                              <div className="text-xs text-green-600 font-medium">
                                Avg: {test.averageScore.toFixed(1)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(test.status)}`}>
                            {test.status.toUpperCase()}
                          </span>
                          {test.status === 'scheduled' && (
                            <div className="text-xs text-yellow-600 mt-1">
                              {getTimeRemaining(test.scheduledAt)}
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => openViewModal(test)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded transition-colors"
                              title="View"
                            >
                              <EyeIcon size={16} />
                            </button>
                            <button
                              onClick={() => openQuestionModal(test)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors"
                              title="Questions"
                            >
                              <BookOpenIcon size={16} />
                            </button>
                            {test.status === 'completed' && (
                              <button
                                onClick={() => openResultModal(test)}
                                className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors"
                                title="Results"
                              >
                                <BarChart3Icon size={16} />
                              </button>
                            )}
                            {test.status === 'active' && (
                              <button
                                onClick={() => openMonitorModal(test)}
                                className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-1 rounded transition-colors"
                                title="Monitor"
                              >
                                <TimerIcon size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => openEditModal(test)}
                              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-1 rounded transition-colors"
                              title="Edit"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(test)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 p-1 rounded transition-colors"
                              title="Delete"
                            >
                              <TrashIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileTextIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedStatus !== 'all' || selectedDepartment !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Create your first test to get started'
              }
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Test
            </button>
          </div>
        )}

        {/* Create Test Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Test</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Title *</label>
                  <input
                    type="text"
                    value={newTest.title}
                    onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter test title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={newTest.subject}
                    onChange={(e) => setNewTest({...newTest, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newTest.department}
                    onChange={(e) => setNewTest({...newTest, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <select
                    value={newTest.semester}
                    onChange={(e) => setNewTest({...newTest, semester: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                  <select
                    value={newTest.testType}
                    onChange={(e) => setNewTest({...newTest, testType: e.target.value as 'quiz' | 'midterm' | 'final' | 'assignment' | 'practice'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {testTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    value={newTest.duration}
                    onChange={(e) => setNewTest({...newTest, duration: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
                  <input
                    type="number"
                    min="1"
                    value={newTest.totalQuestions}
                    onChange={(e) => setNewTest({...newTest, totalQuestions: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={newTest.maxMarks}
                    onChange={(e) => setNewTest({...newTest, maxMarks: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passing Marks</label>
                  <input
                    type="number"
                    min="1"
                    max={newTest.maxMarks}
                    value={newTest.passingMarks}
                    onChange={(e) => setNewTest({...newTest, passingMarks: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Start *</label>
                  <input
                    type="datetime-local"
                    value={newTest.scheduledAt}
                    onChange={(e) => setNewTest({...newTest, scheduledAt: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                  <input
                    type="datetime-local"
                    value={newTest.endAt}
                    onChange={(e) => setNewTest({...newTest, endAt: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea
                  value={newTest.instructions}
                  onChange={(e) => setNewTest({...newTest, instructions: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter test instructions for students"
                ></textarea>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTest.allowRetake}
                    onChange={(e) => setNewTest({...newTest, allowRetake: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Allow Retake</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTest.randomizeQuestions}
                    onChange={(e) => setNewTest({...newTest, randomizeQuestions: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Randomize Questions</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTest.showResults}
                    onChange={(e) => setNewTest({...newTest, showResults: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Show Results</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTest.autoGrade}
                    onChange={(e) => setNewTest({...newTest, autoGrade: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Auto Grade</span>
                </label>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTest}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Test'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Test Modal */}
        {isViewModalOpen && selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedTest.title}</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Test Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Subject:</span>
                      <span>{selectedTest.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Department:</span>
                      <span>{selectedTest.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Semester:</span>
                      <span>{selectedTest.semester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Type:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedTest.testType)}`}>
                        {selectedTest.testType.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTest.status)}`}>
                        {selectedTest.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>{selectedTest.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Questions:</span>
                      <span>{selectedTest.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Max Marks:</span>
                      <span>{selectedTest.maxMarks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Passing Marks:</span>
                      <span>{selectedTest.passingMarks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created By:</span>
                      <span>{selectedTest.createdBy}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedTest.instructions || 'No instructions provided'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Schedule & Settings</h3>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="font-medium">Scheduled Start:</span>
                      <span>{formatDateTime(selectedTest.scheduledAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">End Time:</span>
                      <span>{formatDateTime(selectedTest.endAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created:</span>
                      <span>{formatDateTime(selectedTest.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Test Settings</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        {selectedTest.allowRetake ? (
                          <CheckCircleIcon size={16} className="text-green-500" />
                        ) : (
                          <XCircleIcon size={16} className="text-red-500" />
                        )}
                        <span>Allow Retake</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedTest.randomizeQuestions ? (
                          <CheckCircleIcon size={16} className="text-green-500" />
                        ) : (
                          <XCircleIcon size={16} className="text-red-500" />
                        )}
                        <span>Randomize</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedTest.showResults ? (
                          <CheckCircleIcon size={16} className="text-green-500" />
                        ) : (
                          <XCircleIcon size={16} className="text-red-500" />
                        )}
                        <span>Show Results</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedTest.autoGrade ? (
                          <CheckCircleIcon size={16} className="text-green-500" />
                        ) : (
                          <XCircleIcon size={16} className="text-red-500" />
                        )}
                        <span>Auto Grade</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Participation</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{selectedTest.participants}</p>
                        <p className="text-sm text-gray-600">Registered</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {selectedTest.status === 'completed' ? selectedTest.averageScore.toFixed(1) : '-'}
                        </p>
                        <p className="text-sm text-gray-600">Avg Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => openQuestionModal(selectedTest)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <BookOpenIcon size={16} className="inline mr-2" />
                  Manage Questions
                </button>
                {selectedTest.status === 'completed' && (
                  <button
                    onClick={() => exportResults(selectedTest.id)}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <DownloadIcon size={16} className="inline mr-2" />
                    Export Results
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openEditModal(selectedTest);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Edit Test
                </button>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Test Modal */}
        {isEditModalOpen && editingTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Test</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
                  <input
                    type="text"
                    value={newTest.title}
                    onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editingTest.status}
                    onChange={(e) => setEditingTest({...editingTest, status: e.target.value as Test['status']})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={newTest.duration}
                    onChange={(e) => setNewTest({...newTest, duration: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Marks</label>
                  <input
                    type="number"
                    value={newTest.maxMarks}
                    onChange={(e) => setNewTest({...newTest, maxMarks: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea
                  value={newTest.instructions}
                  onChange={(e) => setNewTest({...newTest, instructions: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingTest(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingTest) {
                      setEditingTest({
                        ...editingTest,
                        title: newTest.title,
                        duration: newTest.duration,
                        maxMarks: newTest.maxMarks,
                        instructions: newTest.instructions
                      });
                      handleEditTest();
                    }
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Test Modal */}
        {isDeleteModalOpen && selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Test</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "<strong>{selectedTest.title}</strong>"? 
                This action cannot be undone and will remove all test data and results.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedTest(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTest}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Test
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Question Management Modal */}
        {isQuestionModalOpen && selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Questions - {selectedTest.title}
                </h2>
                <button
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="text-center py-12">
                <BookOpenIcon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Question Management</h3>
                <p className="text-gray-600 mb-6">
                  Advanced question builder with multiple question types, 
                  auto-grading, and question bank integration.
                </p>
                <div className="flex gap-3 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Add Questions
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Import from Bank
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Modal */}
        {isResultModalOpen && selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Results - {selectedTest.title}
                </h2>
                <button
                  onClick={() => setIsResultModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="text-center py-12">
                <BarChart3Icon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Test Results & Analytics</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive results analysis with performance metrics, 
                  grade distribution, and detailed student reports.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => exportResults(selectedTest.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Export Results
                  </button>
                  {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    View Analytics
                  </button> */}
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsResultModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Monitor Modal */}
        {isMonitorModalOpen && selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Monitor - {selectedTest.title}
                </h2>
                <button
                  onClick={() => setIsMonitorModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="text-center py-12">
                <TimerIcon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Live Test Monitoring</h3>
                <p className="text-gray-600 mb-6">
                  Real-time monitoring of active test sessions with student progress tracking, 
                  time alerts, and anti-cheating measures.
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedTest.participants}</p>
                    <p className="text-sm text-gray-600">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">12</p>
                    <p className="text-sm text-gray-600">Submitted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">3</p>
                    <p className="text-sm text-gray-600">Warnings</p>
                  </div>
                </div>
                <button
                  onClick={() => handleEndTest(selectedTest.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  End Test
                </button>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsMonitorModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineTest;
