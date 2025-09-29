import React, { useState, useEffect } from 'react';
import { Plus, Eye, Edit, Save, X, Clock, Users, BookOpen, Award, Calendar, FileText, Timer, CheckCircle, AlertCircle, TrendingUp, BarChart3, Menu, Upload, Minus, PlusCircle } from 'lucide-react';

const OnlineTestHod = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(''); // Added program filter
  const [showSidebar, setShowSidebar] = useState(false); // Mobile sidebar
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Enhanced data with proper ordering
  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English Literature', 'Economics'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['1st Semester', '2nd Semester'];
  
  // Added programs array as requested
  const programs = ['B.Tech CSE', 'M.Tech CSE', 'B.Tech IT', 'M.Tech IT', 'B.Tech ECE', 'M.Tech ECE'];
  
  const testTypes = ['Quiz', 'Mid-term', 'Final', 'Assignment Test', 'Practice Test'];

  // Helper functions for sorting
  const getYearOrder = (year) => {
    const yearMap = { '1st Year': 1, '2nd Year': 2, '3rd Year': 3, '4th Year': 4 };
    return yearMap[year] || 0;
  };

  const getSemesterOrder = (semester) => {
    const semesterMap = { '1st Semester': 1, '2nd Semester': 2 };
    return semesterMap[semester] || 0;
  };

  // Enhanced online tests data with comprehensive coverage (including program field)
  const [onlineTests, setOnlineTests] = useState([
    // 1st Year Tests
    {
      id: 1,
      title: 'Introduction to Programming',
      subject: 'Computer Science',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE', // Added program field
      type: 'Quiz',
      duration: 45,
      totalQuestions: 20,
      totalMarks: 50,
      startDate: '2024-12-01',
      endDate: '2024-12-03',
      startTime: '09:00',
      endTime: '11:00',
      description: 'Basic programming concepts and logic building',
      instructions: 'Answer all questions. No negative marking. Focus on fundamentals.',
      attempts: 1,
      status: 'Active',
      createdDate: '2024-11-20',
      questionPaper: null,
      questions: []
    },
    {
      id: 2,
      title: 'Calculus Fundamentals',
      subject: 'Mathematics',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech IT', // Added program field
      type: 'Mid-term',
      duration: 90,
      totalQuestions: 15,
      totalMarks: 75,
      startDate: '2024-12-05',
      endDate: '2024-12-05',
      startTime: '10:00',
      endTime: '12:00',
      description: 'Limits, derivatives, and basic integration',
      instructions: 'Show all working steps. Partial marks awarded.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-11-22',
      questionPaper: null,
      questions: []
    },
    {
      id: 3,
      title: 'Mechanics Basics',
      subject: 'Physics',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech ECE', // Added program field
      type: 'Practice Test',
      duration: 60,
      totalQuestions: 25,
      totalMarks: 100,
      startDate: '2024-12-08',
      endDate: '2024-12-10',
      startTime: '14:00',
      endTime: '16:00',
      description: 'Newton\'s laws and motion problems',
      instructions: 'Practice test for mid-term preparation.',
      attempts: 2,
      status: 'Active',
      createdDate: '2024-11-25',
      questionPaper: null,
      questions: []
    },
    {
      id: 4,
      title: 'Basic Chemistry Concepts',
      subject: 'Chemistry',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE', // Added program field
      type: 'Quiz',
      duration: 30,
      totalQuestions: 15,
      totalMarks: 30,
      startDate: '2024-12-12',
      endDate: '2024-12-14',
      startTime: '11:00',
      endTime: '13:00',
      description: 'Atomic structure and periodic table',
      instructions: 'Quick assessment of basic concepts.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-11-28',
      questionPaper: null,
      questions: []
    },
    {
      id: 5,
      title: 'Essay Writing Techniques',
      subject: 'English Literature',
      year: '1st Year',
      semester: '2nd Semester',
      program: 'B.Tech IT', // Added program field
      type: 'Assignment Test',
      duration: 120,
      totalQuestions: 5,
      totalMarks: 100,
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      startTime: '09:00',
      endTime: '12:00',
      description: 'Creative writing and analytical essays',
      instructions: 'Focus on structure, grammar, and creativity.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-12-01',
      questionPaper: null,
      questions: []
    },
    {
      id: 6,
      title: 'Microeconomics Principles',
      subject: 'Economics',
      year: '1st Year',
      semester: '2nd Semester',
      program: 'B.Tech ECE', // Added program field
      type: 'Mid-term',
      duration: 90,
      totalQuestions: 12,
      totalMarks: 80,
      startDate: '2025-01-20',
      endDate: '2025-01-20',
      startTime: '10:00',
      endTime: '13:00',
      description: 'Supply, demand, and market equilibrium',
      instructions: 'Solve numerical problems with proper steps.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-12-02',
      questionPaper: null,
      questions: []
    },

    // 2nd Year Tests
    {
      id: 7,
      title: 'Data Structures & Algorithms Quiz',
      subject: 'Computer Science',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'M.Tech CSE', // Added program field
      type: 'Quiz',
      duration: 60,
      totalQuestions: 25,
      totalMarks: 100,
      startDate: '2024-12-01',
      endDate: '2024-12-03',
      startTime: '10:00',
      endTime: '12:00',
      description: 'Comprehensive quiz on data structures and algorithm analysis',
      instructions: 'Answer all questions. No negative marking. Time limit: 60 minutes per attempt.',
      attempts: 1,
      status: 'Active',
      createdDate: '2024-11-25',
      questionPaper: null,
      questions: []
    },
    {
      id: 8,
      title: 'Linear Algebra',
      subject: 'Mathematics',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'M.Tech IT', // Added program field
      type: 'Final',
      duration: 180,
      totalQuestions: 20,
      totalMarks: 200,
      startDate: '2024-12-15',
      endDate: '2024-12-15',
      startTime: '09:00',
      endTime: '12:00',
      description: 'Matrices, eigenvalues, and vector spaces',
      instructions: 'Final examination - all topics covered.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-11-30',
      questionPaper: null,
      questions: []
    },
    {
      id: 9,
      title: 'Thermodynamics',
      subject: 'Physics',
      year: '2nd Year',
      semester: '2nd Semester',
      program: 'M.Tech ECE', // Added program field
      type: 'Mid-term',
      duration: 120,
      totalQuestions: 18,
      totalMarks: 150,
      startDate: '2025-01-25',
      endDate: '2025-01-25',
      startTime: '14:00',
      endTime: '17:00',
      description: 'Heat engines and entropy calculations',
      instructions: 'Numerical problems require detailed solutions.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-12-05',
      questionPaper: null,
      questions: []
    },

    // 3rd Year Tests
    {
      id: 10,
      title: 'Operating Systems',
      subject: 'Computer Science',
      year: '3rd Year',
      semester: '1st Semester',
      program: 'M.Tech CSE', // Added program field
      type: 'Final',
      duration: 180,
      totalQuestions: 15,
      totalMarks: 200,
      startDate: '2024-12-20',
      endDate: '2024-12-20',
      startTime: '09:00',
      endTime: '12:00',
      description: 'Process management, memory management, file systems',
      instructions: 'Comprehensive final exam covering all modules.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-12-01',
      questionPaper: null,
      questions: []
    },
    {
      id: 11,
      title: 'Differential Equations',
      subject: 'Mathematics',
      year: '3rd Year',
      semester: '2nd Semester',
      program: 'M.Tech IT', // Added program field
      type: 'Mid-term',
      duration: 150,
      totalQuestions: 16,
      totalMarks: 120,
      startDate: '2025-02-10',
      endDate: '2025-02-10',
      startTime: '10:00',
      endTime: '13:00',
      description: 'Ordinary and partial differential equations',
      instructions: 'Focus on solution methods and applications.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-12-10',
      questionPaper: null,
      questions: []
    },

    // 4th Year Tests
    {
      id: 12,
      title: 'Machine Learning',
      subject: 'Computer Science',
      year: '4th Year',
      semester: '1st Semester',
      program: 'M.Tech ECE', // Added program field
      type: 'Assignment Test',
      duration: 240,
      totalQuestions: 10,
      totalMarks: 250,
      startDate: '2025-01-30',
      endDate: '2025-02-01',
      startTime: '09:00',
      endTime: '18:00',
      description: 'Algorithms, neural networks, and practical implementation',
      instructions: 'Project-based assessment with coding components.',
      attempts: 1,
      status: 'Scheduled',
      createdDate: '2024-12-15',
      questionPaper: null,
      questions: []
    }
  ]);

  // Enhanced test submissions with comprehensive student data (including program field)
  const [testSubmissions, setTestSubmissions] = useState([
    // 1st Year Submissions
    {
      id: 1,
      testId: 1,
      studentName: 'Aarav Sharma',
      studentId: 'CS101',
      subject: 'Computer Science',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE', // Added program field
      submittedDate: '2024-12-01',
      startTime: '09:15:00',
      endTime: '09:50:00',
      timeTaken: 35,
      status: 'Completed',
      score: 42,
      maxScore: 50,
      percentage: 84,
      questionsAnswered: 20,
      totalQuestions: 20,
      correctAnswers: 17,
      wrongAnswers: 3,
      unanswered: 0,
      attempts: 1,
      feedback: 'Good understanding of basic programming concepts'
    },
    {
      id: 3,
      testId: 3,
      studentName: 'Rohan Kumar',
      studentId: 'PH101',
      subject: 'Physics',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech ECE', // Added program field
      submittedDate: '2024-12-08',
      startTime: '14:20:00',
      endTime: '15:15:00',
      timeTaken: 55,
      status: 'Completed',
      score: 78,
      maxScore: 100,
      percentage: 78,
      questionsAnswered: 24,
      totalQuestions: 25,
      correctAnswers: 19,
      wrongAnswers: 5,
      unanswered: 1,
      attempts: 1,
      feedback: 'Strong grasp of mechanics fundamentals'
    },

    // 2nd Year Submissions
    {
      id: 7,
      testId: 7,
      studentName: 'John Doe',
      studentId: 'CS201',
      subject: 'Computer Science',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'M.Tech CSE', // Added program field
      submittedDate: '2024-12-01',
      startTime: '10:15:00',
      endTime: '11:05:00',
      timeTaken: 50,
      status: 'Completed',
      score: 85,
      maxScore: 100,
      percentage: 85,
      questionsAnswered: 24,
      totalQuestions: 25,
      correctAnswers: 21,
      wrongAnswers: 3,
      unanswered: 1,
      attempts: 1,
      feedback: 'Good performance with solid understanding of core concepts'
    },
    {
      id: 8,
      testId: 7,
      studentName: 'Jane Smith',
      studentId: 'CS202',
      subject: 'Computer Science',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'M.Tech CSE', // Added program field
      submittedDate: '2024-12-02',
      startTime: '10:30:00',
      endTime: '11:25:00',
      timeTaken: 55,
      status: 'Completed',
      score: 92,
      maxScore: 100,
      percentage: 92,
      questionsAnswered: 25,
      totalQuestions: 25,
      correctAnswers: 23,
      wrongAnswers: 2,
      unanswered: 0,
      attempts: 1,
      feedback: 'Excellent work! Strong grasp of advanced algorithms'
    }
  ]);

  const [newTest, setNewTest] = useState({
    title: '',
    subject: '',
    year: '',
    semester: '',
    program: '', // Added program field
    type: 'Quiz',
    duration: '',
    totalQuestions: '',
    totalMarks: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
    instructions: '',
    attempts: 1,
    questionPaper: null,
    questions: []
  });

  // Question management
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1
  });

  // Enhanced filtering and sorting with hierarchical order: Year -> Semester -> Subject -> Program
  const filteredSubmissions = testSubmissions
    .filter(submission => {
      return (
        (!selectedSubject || submission.subject === selectedSubject) &&
        (!selectedYear || submission.year === selectedYear) &&
        (!selectedSemester || submission.semester === selectedSemester) &&
        (!selectedProgram || submission.program === selectedProgram) // Added program filter
      );
    })
    .sort((a, b) => {
      // Sort by Year first, then Semester, then Subject, then Program
      const yearA = getYearOrder(a.year);
      const yearB = getYearOrder(b.year);
      if (yearA !== yearB) return yearA - yearB;
      
      const semesterA = getSemesterOrder(a.semester);
      const semesterB = getSemesterOrder(b.semester);
      if (semesterA !== semesterB) return semesterA - semesterB;
      
      const subjectCompare = a.subject.localeCompare(b.subject);
      if (subjectCompare !== 0) return subjectCompare;
      
      return a.program.localeCompare(b.program);
    });

  const filteredTests = onlineTests
    .filter(test => {
      return (
        (!selectedSubject || test.subject === selectedSubject) &&
        (!selectedYear || test.year === selectedYear) &&
        (!selectedSemester || test.semester === selectedSemester) &&
        (!selectedProgram || test.program === selectedProgram) // Added program filter
      );
    })
    .sort((a, b) => {
      // Sort by Year first, then Semester, then Subject, then Program
      const yearA = getYearOrder(a.year);
      const yearB = getYearOrder(b.year);
      if (yearA !== yearB) return yearA - yearB;
      
      const semesterA = getSemesterOrder(a.semester);
      const semesterB = getSemesterOrder(b.semester);
      if (semesterA !== semesterB) return semesterA - semesterB;
      
      const subjectCompare = a.subject.localeCompare(b.subject);
      if (subjectCompare !== 0) return subjectCompare;
      
      return a.program.localeCompare(b.program);
    });

  const handleAddTest = () => {
    if (newTest.title && newTest.subject && newTest.year && newTest.semester && newTest.program) {
      const test = {
        ...newTest,
        id: onlineTests.length + 1,
        duration: parseInt(newTest.duration),
        totalQuestions: parseInt(newTest.totalQuestions),
        totalMarks: parseInt(newTest.totalMarks),
        attempts: parseInt(newTest.attempts),
        status: new Date(newTest.startDate) > new Date() ? 'Scheduled' : 'Active',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setOnlineTests([...onlineTests, test]);
      setNewTest({
        title: '',
        subject: '',
        year: '',
        semester: '',
        program: '', // Reset program field
        type: 'Quiz',
        duration: '',
        totalQuestions: '',
        totalMarks: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        description: '',
        instructions: '',
        attempts: 1,
        questionPaper: null,
        questions: []
      });
      setCurrentQuestion({
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: 1
      });
      setShowAddForm(false);
    }
  };

  const handleEditTest = (test) => {
    setEditingTest({...test});
  };

  const handleSaveEdit = () => {
    setOnlineTests(onlineTests.map(t => 
      t.id === editingTest.id ? editingTest : t
    ));
    setEditingTest(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTest({...newTest, questionPaper: file});
    }
  };

  const handleAddQuestion = () => {
    if (currentQuestion.question.trim()) {
      const question = {
        ...currentQuestion,
        id: newTest.questions.length + 1
      };
      setNewTest({
        ...newTest,
        questions: [...newTest.questions, question]
      });
      setCurrentQuestion({
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: 1
      });
    }
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = newTest.questions.filter((_, i) => i !== index);
    setNewTest({...newTest, questions: updatedQuestions});
  };

  const updateQuestionOption = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({...currentQuestion, options: updatedOptions});
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, '']
    });
  };

  const removeOption = (index) => {
    if (currentQuestion.options.length > 2) {
      const updatedOptions = currentQuestion.options.filter((_, i) => i !== index);
      setCurrentQuestion({...currentQuestion, options: updatedOptions});
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Not Started': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 85) return 'text-green-600 dark:text-green-400';
    if (percentage >= 70) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Analytics data
  const getAnalyticsData = () => {
    const completed = filteredSubmissions.filter(s => s.status === 'Completed');
    const totalStudents = filteredSubmissions.length;
    const avgScore = completed.length > 0 ? completed.reduce((sum, s) => sum + s.percentage, 0) / completed.length : 0;
    
    return {
      totalTests: filteredTests.length,
      totalStudents: totalStudents,
      completedTests: completed.length,
      avgScore: avgScore.toFixed(1),
      completionRate: totalStudents > 0 ? ((completed.length / totalStudents) * 100).toFixed(1) : 0
    };
  };

  const analytics = getAnalyticsData();

  return (
    <div className="min-h-screen bg--to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-indigo-600 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setShowSidebar(true)} /> 
          Online Test Dashboard
        </h1>
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex md:hidden">
          <div className="bg-white dark:bg-slate-800 w-3/4 h-full p-6 flex flex-col gap-4">
            <button
              className="self-end mb-4 text-gray-700 dark:text-gray-300"
              onClick={() => setShowSidebar(false)}
            >
              <X className="w-7 h-7" />
            </button>
            
            <label className="block text-md text-gray-700 dark:text-gray-300">Year
              <select 
                value={selectedYear} 
                onChange={e => setSelectedYear(e.target.value)}
                className="mt-2 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>
            
            <label className="block text-md text-gray-700 dark:text-gray-300">Semester
              <select 
                value={selectedSemester} 
                onChange={e => setSelectedSemester(e.target.value)}
                className="mt-2 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Semesters</option>
                {semesters.map(se => <option key={se} value={se}>{se}</option>)}
              </select>
            </label>
            
            <label className="block text-md text-gray-700 dark:text-gray-300">Program
              <select 
                value={selectedProgram} 
                onChange={e => setSelectedProgram(e.target.value)}
                className="mt-2 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Programs</option>
                {programs.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            
            <label className="block text-md text-gray-700 dark:text-gray-300">Subject
              <select 
                value={selectedSubject} 
                onChange={e => setSelectedSubject(e.target.value)}
                className="mt-2 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Subjects</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>
          <div className="flex-1" onClick={() => setShowSidebar(false)}></div>
        </div>
      )}

      
      <div className="p-4 md:max-w-8xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-4 lg:p-6 rounded-t-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">Online Test Management</h1>
                <p className="text-blue-100">Manage online tests and monitor student performance</p>
              </div>
              <div className="flex items-center mt-4 lg:mt-0 space-x-4">
                
              </div>
            </div>
          </div>

          {/* Analytics Panel */}
          {showAnalytics && (
            <div className="p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 border-b dark:border-slate-600">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{analytics.totalTests}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Tests</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{analytics.totalStudents}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Students</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{analytics.completedTests}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{analytics.avgScore}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{analytics.completionRate}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</div>
                </div>
              </div>
            </div>
          )}

          {/* Filters - Updated to include Program: Year, Semester, Program, Subject */}
          <div className="hidden md:block p-4 lg:p-6 border-b bg-gray-50 dark:bg-slate-700 dark:border-slate-600 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Semester</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <option value="">All Semesters</option>
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Program</label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <option value="">All Programs</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b dark:border-slate-600 transition-colors duration-300 overflow-x-auto">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 lg:px-6 py-3 font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'submissions'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Test Submissions ({filteredSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`px-4 lg:px-6 py-3 font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'tests'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Manage Tests ({filteredTests.length})
            </button>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6 bg-white dark:bg-slate-800 transition-colors duration-300">
            {activeTab === 'submissions' && (
              <div>
                <div className="grid gap-4">
                  {filteredSubmissions.map(submission => (
                    <div key={submission.id} className="border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{submission.studentName}</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">ID: {submission.studentId}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(submission.status)}`}>
                              {submission.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                            <div><strong>Year:</strong> {submission.year}</div>
                            <div><strong>Semester:</strong> {submission.semester}</div>
                            <div><strong>Program:</strong> {submission.program}</div>
                            <div><strong>Subject:</strong> {submission.subject}</div>
                            <div><strong>Submitted:</strong> {submission.submittedDate || 'Not yet'}</div>
                          </div>

                          {submission.status === 'Completed' && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
                              <div className="bg-blue-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                <div className={`text-xl font-bold ${getPerformanceColor(submission.percentage)}`}>
                                  {submission.score}/{submission.maxScore}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Score</div>
                              </div>
                              <div className="bg-green-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                  {submission.percentage}%
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Percentage</div>
                              </div>
                              <div className="bg-purple-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                  {submission.timeTaken}m
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Time Taken</div>
                              </div>
                              <div className="bg-yellow-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                                  {submission.correctAnswers}/{submission.totalQuestions}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Correct</div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewingSubmission(submission)}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tests' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Test Management</h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors flex items-center gap-2 w-fit"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Online Test
                  </button>
                </div>

                <div className="grid gap-4">
                  {filteredTests.map(test => (
                    <div key={test.id} className="border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg p-4 lg:p-6 transition-colors duration-300">
                      {editingTest && editingTest.id === test.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editingTest.title}
                            onChange={(e) => setEditingTest({...editingTest, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                            placeholder="Test Title"
                          />
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <select
                              value={editingTest.year}
                              onChange={(e) => setEditingTest({...editingTest, year: e.target.value})}
                              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                            >
                              <option value="">Select Year</option>
                              {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                            <select
                              value={editingTest.semester}
                              onChange={(e) => setEditingTest({...editingTest, semester: e.target.value})}
                              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                            >
                              <option value="">Select Semester</option>
                              {semesters.map(semester => (
                                <option key={semester} value={semester}>{semester}</option>
                              ))}
                            </select>
                            <select
                              value={editingTest.program || ''}
                              onChange={(e) => setEditingTest({...editingTest, program: e.target.value})}
                              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                            >
                              <option value="">Select Program</option>
                              {programs.map(program => (
                                <option key={program} value={program}>{program}</option>
                              ))}
                            </select>
                            <select
                              value={editingTest.subject}
                              onChange={(e) => setEditingTest({...editingTest, subject: e.target.value})}
                              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                            >
                              <option value="">Select Subject</option>
                              {subjects.map(subject => (
                                <option key={subject} value={subject}>{subject}</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <input
                              type="number"
                              value={editingTest.duration}
                              onChange={(e) => setEditingTest({...editingTest, duration: parseInt(e.target.value)})}
                              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                              placeholder="Duration (minutes)"
                            />
                            <input
                              type="number"
                              value={editingTest.totalQuestions}
                              onChange={(e) => setEditingTest({...editingTest, totalQuestions: parseInt(e.target.value)})}
                              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                              placeholder="Total Questions"
                            />
                            <input
                              type="number"
                              value={editingTest.totalMarks}
                              onChange={(e) => setEditingTest({...editingTest, totalMarks: parseInt(e.target.value)})}
                              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                              placeholder="Total Marks"
                            />
                            <select
                              value={editingTest.type}
                              onChange={(e) => setEditingTest({...editingTest, type: e.target.value})}
                              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                            >
                              {testTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>

                          <textarea
                            value={editingTest.description}
                            onChange={(e) => setEditingTest({...editingTest, description: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                            rows="3"
                            placeholder="Test Description"
                          />

                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2 justify-center"
                            >
                              <Save className="w-4 h-4" />
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingTest(null)}
                              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center gap-2 justify-center"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100">{test.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(test.status)}`}>
                                  {test.status}
                                </span>
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium w-fit">
                                  {test.type}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                                <div><strong>Year:</strong> {test.year}</div>
                                <div><strong>Semester:</strong> {test.semester}</div>
                                <div><strong>Program:</strong> {test.program}</div>
                                <div><strong>Subject:</strong> {test.subject}</div>
                                <div><strong>Created:</strong> {test.createdDate}</div>
                              </div>

                              <p className="text-gray-700 dark:text-gray-300 mb-4">{test.description}</p>

                              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                                <div className="bg-blue-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                  <div className="flex items-center justify-center mb-1">
                                    <Timer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{test.duration}m</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Duration</div>
                                </div>
                                <div className="bg-green-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                  <div className="flex items-center justify-center mb-1">
                                    <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{test.totalQuestions}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Questions</div>
                                </div>
                                <div className="bg-purple-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                  <div className="flex items-center justify-center mb-1">
                                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{test.totalMarks}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Marks</div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                  <div className="flex items-center justify-center mb-1">
                                    <Users className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                  </div>
                                  <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{test.attempts}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Attempts</div>
                                </div>
                                <div className="bg-indigo-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                  <div className="flex items-center justify-center mb-1">
                                    <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                  </div>
                                  <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{test.startDate}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Start Date</div>
                                </div>
                                <div className="bg-red-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                                  <div className="flex items-center justify-center mb-1">
                                    <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
                                  </div>
                                  <div className="text-sm font-bold text-red-600 dark:text-red-400">{test.endDate}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">End Date</div>
                                </div>
                              </div>

                              <div className="bg-gray-50 dark:bg-slate-600 rounded-lg p-3">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Test Schedule:</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Available from <strong>{test.startTime}</strong> to <strong>{test.endTime}</strong>
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                  <strong>Instructions:</strong> {test.instructions}
                                </p>
                              </div>

                              {/* Show question paper and questions info */}
                              {test.questionPaper && (
                                <div className="bg-blue-50 dark:bg-slate-600 rounded-lg p-3 mt-3">
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Question Paper:</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <strong>File:</strong> {test.questionPaper.name}
                                  </p>
                                </div>
                              )}
                              
                              {test.questions.length > 0 && (
                                <div className="bg-green-50 dark:bg-slate-600 rounded-lg p-3 mt-3">
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Added Questions:</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {test.questions.length} questions manually added
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                              <button
                                onClick={() => handleEditTest(test)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
                              >
                                <Edit className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit Test</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Add Test Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-600 p-4 lg:p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100">Create New Online Test</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newTest.title}
                    onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    placeholder="Test Title"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <select
                      value={newTest.year}
                      onChange={(e) => setNewTest({...newTest, year: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    >
                      <option value="">Select Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={newTest.semester}
                      onChange={(e) => setNewTest({...newTest, semester: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    >
                      <option value="">Select Semester</option>
                      {semesters.map(semester => (
                        <option key={semester} value={semester}>{semester}</option>
                      ))}
                    </select>
                    <select
                      value={newTest.program}
                      onChange={(e) => setNewTest({...newTest, program: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    >
                      <option value="">Select Program</option>
                      {programs.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                    <select
                      value={newTest.subject}
                      onChange={(e) => setNewTest({...newTest, subject: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <select
                      value={newTest.type}
                      onChange={(e) => setNewTest({...newTest, type: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    >
                      {testTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={newTest.description}
                    onChange={(e) => setNewTest({...newTest, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    rows="3"
                    placeholder="Test Description"
                  />
                </div>
              </div>

              {/* Test Configuration */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Test Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      value={newTest.duration}
                      onChange={(e) => setNewTest({...newTest, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                      placeholder="60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Questions</label>
                    <input
                      type="number"
                      value={newTest.totalQuestions}
                      onChange={(e) => setNewTest({...newTest, totalQuestions: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Marks</label>
                    <input
                      type="number"
                      value={newTest.totalMarks}
                      onChange={(e) => setNewTest({...newTest, totalMarks: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Attempts</label>
                    <input
                      type="number"
                      value={newTest.attempts}
                      onChange={(e) => setNewTest({...newTest, attempts: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                      placeholder="1"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Test Schedule</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newTest.startDate}
                      onChange={(e) => setNewTest({...newTest, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                    <input
                      type="date"
                      value={newTest.endDate}
                      onChange={(e) => setNewTest({...newTest, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={newTest.startTime}
                      onChange={(e) => setNewTest({...newTest, startTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time</label>
                    <input
                      type="time"
                      value={newTest.endTime}
                      onChange={(e) => setNewTest({...newTest, endTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Question Paper Upload */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Upload Question Paper</h3>
                <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="question-paper" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                          Upload question paper (PDF, DOC, DOCX)
                        </span>
                        <input
                          id="question-paper"
                          name="question-paper"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Upload a document containing all test questions
                      </p>
                    </div>
                  </div>
                  {newTest.questionPaper && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-slate-700 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-green-400" />
                        <span className="ml-2 text-sm text-green-700 dark:text-green-300">
                          {newTest.questionPaper.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setNewTest({...newTest, questionPaper: null})}
                          className="ml-auto text-green-600 hover:text-green-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Question Addition */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Add Questions Manually</h3>
                
                {/* Current Question Form */}
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Question Text</label>
                      <textarea
                        value={currentQuestion.question}
                        onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                        rows="3"
                        placeholder="Enter your question here..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Question Type</label>
                        <select
                          value={currentQuestion.type}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, type: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                        >
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="true-false">True/False</option>
                          <option value="short-answer">Short Answer</option>
                          <option value="essay">Essay</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marks</label>
                        <input
                          type="number"
                          value={currentQuestion.marks}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, marks: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                          min="1"
                        />
                      </div>
                    </div>

                    {(currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options</label>
                        <div className="space-y-2">
                          {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => updateQuestionOption(index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                              />
                              {currentQuestion.options.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => removeOption(index)}
                                  className="p-2 text-red-500 hover:text-red-700"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          {currentQuestion.options.length < 6 && currentQuestion.type === 'multiple-choice' && (
                            <button
                              type="button"
                              onClick={addOption}
                              className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Add Option
                            </button>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Correct Answer</label>
                          <select
                            value={currentQuestion.correctAnswer}
                            onChange={(e) => setCurrentQuestion({...currentQuestion, correctAnswer: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                          >
                            <option value="">Select correct answer</option>
                            {currentQuestion.options.map((option, index) => (
                              option && (
                                <option key={index} value={option}>
                                  {String.fromCharCode(65 + index)}: {option}
                                </option>
                              )
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {currentQuestion.type === 'short-answer' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Answer</label>
                        <textarea
                          value={currentQuestion.correctAnswer}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, correctAnswer: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                          rows="2"
                          placeholder="Enter sample/expected answer..."
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Question
                    </button>
                  </div>
                </div>

                {/* Added Questions List */}
                {newTest.questions.length > 0 && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Added Questions ({newTest.questions.length})
                    </h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {newTest.questions.map((question, index) => (
                        <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-600">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs">
                                  Q{index + 1}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                  {question.type.replace('-', ' ')}
                                </span>
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                                  {question.marks} marks
                                </span>
                              </div>
                              <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">
                                {question.question}
                              </p>
                              {question.type === 'multiple-choice' && (
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  Options: {question.options.filter(opt => opt).length} | 
                                  Correct: {question.correctAnswer}
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(index)}
                              className="ml-2 p-1 text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Test Instructions</h3>
                <textarea
                  value={newTest.instructions}
                  onChange={(e) => setNewTest({...newTest, instructions: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                  rows="4"
                  placeholder="Enter detailed instructions for students taking this test..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t dark:border-slate-600">
                <button
                  onClick={handleAddTest}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors flex items-center gap-2 justify-center font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Create Test
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 justify-center font-medium"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submission Details Modal */}
      {viewingSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-600 p-4 lg:p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100">Test Submission Details</h2>
                <button
                  onClick={() => setViewingSubmission(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6">
              {/* Student Information */}
              <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Student Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><strong className="text-gray-700 dark:text-gray-300">Name:</strong> <span className="text-gray-900 dark:text-gray-100">{viewingSubmission.studentName}</span></div>
                  <div><strong className="text-gray-700 dark:text-gray-300">Student ID:</strong> <span className="text-gray-900 dark:text-gray-100">{viewingSubmission.studentId}</span></div>
                  <div><strong className="text-gray-700 dark:text-gray-300">Program:</strong> <span className="text-gray-900 dark:text-gray-100">{viewingSubmission.program}</span></div>
                  <div><strong className="text-gray-700 dark:text-gray-300">Subject:</strong> <span className="text-gray-900 dark:text-gray-100">{viewingSubmission.subject}</span></div>
                  <div><strong className="text-gray-700 dark:text-gray-300">Academic Year:</strong> <span className="text-gray-900 dark:text-gray-100">{viewingSubmission.year} - {viewingSubmission.semester}</span></div>
                </div>
              </div>

              {viewingSubmission.status === 'Completed' && (
                <>
                  {/* Performance Overview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-slate-700 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{viewingSubmission.score}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{viewingSubmission.percentage}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Percentage</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-slate-700 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{viewingSubmission.timeTaken}m</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Time Taken</div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-slate-700 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{viewingSubmission.attempts}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Attempts Used</div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Question Analysis</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Total Questions:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{viewingSubmission.totalQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-700 dark:text-green-300">Correct Answers:</span>
                          <span className="font-medium text-green-600 dark:text-green-400">{viewingSubmission.correctAnswers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-red-700 dark:text-red-300">Wrong Answers:</span>
                          <span className="font-medium text-red-600 dark:text-red-400">{viewingSubmission.wrongAnswers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Unanswered:</span>
                          <span className="font-medium text-gray-600 dark:text-gray-400">{viewingSubmission.unanswered}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Time Analysis</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Start Time:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{viewingSubmission.startTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">End Time:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{viewingSubmission.endTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Total Duration:</span>
                          <span className="font-medium text-blue-600 dark:text-blue-400">{viewingSubmission.timeTaken} minutes</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Submission Date:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{viewingSubmission.submittedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div className="bg-yellow-50 dark:bg-slate-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">HOD Feedback</h4>
                    <textarea
                      defaultValue={viewingSubmission.feedback}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                      rows="4"
                      placeholder="Enter feedback for the student's performance..."
                    />
                    <div className="flex justify-end mt-3">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
                        Save Feedback
                      </button>
                    </div>
                  </div>
                </>
              )}

              {viewingSubmission.status === 'Not Started' && (
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Test Not Started</h3>
                  <p className="text-gray-600 dark:text-gray-300">This student has not yet started the test.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineTestHod;
