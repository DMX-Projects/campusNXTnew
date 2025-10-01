import React, { useState, useEffect } from 'react';
import { Plus, Eye, Edit, Save, X, Clock, Users, BookOpen, Award, Calendar, FileText, Timer, CheckCircle, AlertCircle, TrendingUp, BarChart3, Menu, Upload, Minus, PlusCircle, User, Trash2, Download, Filter, Search } from 'lucide-react';

const OnlineTestHod = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [viewingTestDetails, setViewingTestDetails] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced data
  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English Literature', 'Economics'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['1st Semester', '2nd Semester'];
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

  // Online tests data
  const [onlineTests, setOnlineTests] = useState([
    {
      id: 1,
      title: 'Introduction to Programming',
      subject: 'Computer Science',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
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
      createdDate: '2024-11-20'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms Quiz',
      subject: 'Computer Science',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'M.Tech CSE',
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
      createdDate: '2024-11-25'
    },
    {
      id: 3,
      title: 'Calculus Fundamentals',
      subject: 'Mathematics',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech IT',
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
      createdDate: '2024-11-22'
    },
    {
      id: 4,
      title: 'Mechanics Basics',
      subject: 'Physics',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech ECE',
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
      createdDate: '2024-11-25'
    }
  ]);

  // Test submissions data
  const [testSubmissions, setTestSubmissions] = useState([
    {
      id: 1,
      testId: 1,
      studentName: 'Aarav Sharma',
      studentId: 'CS101',
      subject: 'Computer Science',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
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
      id: 2,
      testId: 1,
      studentName: 'Priya Singh',
      studentId: 'CS102',
      subject: 'Computer Science',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
      submittedDate: '2024-12-01',
      startTime: '09:30:00',
      endTime: '10:10:00',
      timeTaken: 40,
      status: 'Completed',
      score: 48,
      maxScore: 50,
      percentage: 96,
      questionsAnswered: 20,
      totalQuestions: 20,
      correctAnswers: 19,
      wrongAnswers: 1,
      unanswered: 0,
      attempts: 1,
      feedback: 'Excellent performance!'
    },
    {
      id: 3,
      testId: 2,
      studentName: 'John Doe',
      studentId: 'CS201',
      subject: 'Computer Science',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'M.Tech CSE',
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
      id: 4,
      testId: 2,
      studentName: 'Jane Smith',
      studentId: 'CS202',
      subject: 'Computer Science',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'M.Tech CSE',
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
    },
    {
      id: 5,
      testId: 1,
      studentName: 'Amit Singh',
      studentId: 'CS103',
      subject: 'Computer Science',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
      submittedDate: '2024-12-01',
      startTime: '09:45:00',
      endTime: '10:20:00',
      timeTaken: 35,
      status: 'Completed',
      score: 38,
      maxScore: 50,
      percentage: 76,
      questionsAnswered: 20,
      totalQuestions: 20,
      correctAnswers: 15,
      wrongAnswers: 5,
      unanswered: 0,
      attempts: 1,
      feedback: 'Good effort, focus on logic building'
    },
    {
      id: 6,
      testId: 4,
      studentName: 'Rohan Kumar',
      studentId: 'PH101',
      subject: 'Physics',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech ECE',
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
    }
  ]);

 const [newTest, setNewTest] = useState({
  title: '',
  subject: '',
  year: '',
  semester: '',
  program: '',
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


  // Filtering and sorting with search
  const filteredSubmissions = testSubmissions
    .filter(submission => {
      const matchesSearch = searchQuery === '' || 
        submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      return (
        matchesSearch &&
        (!selectedSubject || submission.subject === selectedSubject) &&
        (!selectedYear || submission.year === selectedYear) &&
        (!selectedSemester || submission.semester === selectedSemester) &&
        (!selectedProgram || submission.program === selectedProgram)
      );
    })
    .sort((a, b) => {
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
      const matchesSearch = searchQuery === '' || 
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      return (
        matchesSearch &&
        (!selectedSubject || test.subject === selectedSubject) &&
        (!selectedYear || test.year === selectedYear) &&
        (!selectedSemester || test.semester === selectedSemester) &&
        (!selectedProgram || test.program === selectedProgram)
      );
    })
    .sort((a, b) => {
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

  // Group submissions by test
  const groupedSubmissions = filteredSubmissions.reduce((acc, submission) => {
    const test = onlineTests.find(t => t.id === submission.testId);
    if (test) {
      if (!acc[submission.testId]) {
        acc[submission.testId] = {
          test: test,
          submissions: []
        };
      }
      acc[submission.testId].submissions.push(submission);
    }
    return acc;
  }, {});

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Not Started': return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Scheduled': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Expired': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 85) return 'text-emerald-600 dark:text-emerald-400';
    if (percentage >= 70) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTestTypeColor = (type) => {
    switch (type) {
      case 'Quiz': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Mid-term': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Final': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Assignment Test': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Practice Test': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Enhanced Test Card Component
  const TestCard = ({ test, submissions, onClick }) => {
    const totalSubmissions = submissions.length;
    const completedSubmissions = submissions.filter(s => s.status === 'Completed').length;
    const avgScore = completedSubmissions > 0 ? 
      (submissions.filter(s => s.status === 'Completed').reduce((sum, s) => sum + s.percentage, 0) / completedSubmissions).toFixed(1) : 0;

    return (
      <div className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-600 p-6 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500 cursor-pointer transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {test.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(test.status)}`}>
                {test.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTestTypeColor(test.type)}`}>
                {test.type}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{test.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{test.program} - {test.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{test.semester}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{totalSubmissions}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
          </div>
          <div className="text-center bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{completedSubmissions}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Done</div>
          </div>
          <div className="text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{avgScore}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Avg</div>
          </div>
          <div className="text-center bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{test.duration}m</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{test.startDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>{test.totalMarks} marks</span>
          </div>
        </div>

        <button
          onClick={onClick}
          className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 flex items-center justify-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <Eye className="w-4 h-4" /> View Details ({totalSubmissions})
        </button>
      </div>
    );
  };

  // Enhanced Student Submission Card Component
  const StudentSubmissionCard = ({ submission, onClick }) => {
    return (
      <div className="group bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-200 dark:border-slate-600 p-4 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {submission.studentName}
              </h4>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              ID: {submission.studentId}
            </div>
            <div className="flex items-center gap-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                {submission.status}
              </span>
            </div>
          </div>
        </div>
        
        {submission.status === 'Completed' && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2">
              <div className={`text-sm font-bold ${getPerformanceColor(submission.percentage)}`}>
                {submission.score}/{submission.maxScore}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
            </div>
            <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
              <div className={`text-sm font-bold ${getPerformanceColor(submission.percentage)}`}>
                {submission.percentage}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Grade</div>
            </div>
            <div className="text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
              <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                {submission.timeTaken}m
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onClick(submission)}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs hover:from-blue-600 hover:to-blue-700 flex items-center justify-center gap-1 font-medium transition-all duration-200 transform hover:scale-105"
          >
            <Eye className="w-3 h-3" /> View
          </button>
          {submission.status === 'Completed' && (
            <button
              onClick={() => setGradingSubmission(submission)}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-xs hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center gap-1 font-medium transition-all duration-200 transform hover:scale-105"
            >
              <Edit className="w-3 h-3" /> Edit
            </button>
          )}
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          {submission.submittedDate}
        </div>
      </div>
    );
  };

function handleAddTest() {
  // Validation
  if (!newTest.title.trim()) {
    alert('Please enter a test title');
    return;
  }
  if (!newTest.subject) {
    alert('Please select a subject');
    return;
  }
  if (!newTest.year) {
    alert('Please select a year');
    return;
  }
  if (!newTest.semester) {
    alert('Please select a semester');
    return;
  }
  if (!newTest.program) {
    alert('Please select a program');
    return;
  }
  if (!newTest.duration || newTest.duration <= 0) {
    alert('Please enter a valid duration');
    return;
  }
  if (!newTest.totalQuestions || newTest.totalQuestions <= 0) {
    alert('Please enter valid number of questions');
    return;
  }
  if (!newTest.totalMarks || newTest.totalMarks <= 0) {
    alert('Please enter valid total marks');
    return;
  }
  if (!newTest.startDate) {
    alert('Please select a start date');
    return;
  }
  if (!newTest.endDate) {
    alert('Please select an end date');
    return;
  }

  const test = {
    ...newTest,
    id: Math.max(...onlineTests.map(t => t.id), 0) + 1,
    duration: parseInt(newTest.duration),
    totalQuestions: parseInt(newTest.totalQuestions),
    totalMarks: parseInt(newTest.totalMarks),
    attempts: parseInt(newTest.attempts) || 1,
    status: new Date(newTest.startDate) > new Date() ? 'Scheduled' : 'Active',
    createdDate: new Date().toISOString().split('T')[0],
    questionPaperName: newTest.questionPaper ? newTest.questionPaper.name : null,
    questionsCount: newTest.questions ? newTest.questions.length : 0
  };
  
  setOnlineTests([...onlineTests, test]);
  
  // Reset form
  setNewTest({
    title: '',
    subject: '',
    year: '',
    semester: '',
    program: '',
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
  
  setShowAddForm(false);
  alert('Test created successfully!');
}


  // Handle Edit Test - Fixed
  function handleEditTest(test) {
    setEditingTest({ ...test });
  }

  function handleSaveEdit() {
    if (!editingTest.title.trim()) {
      alert('Please enter a test title');
      return;
    }
    
    const updatedTests = onlineTests.map(test =>
      test.id === editingTest.id ? {
        ...editingTest,
        duration: parseInt(editingTest.duration),
        totalQuestions: parseInt(editingTest.totalQuestions),
        totalMarks: parseInt(editingTest.totalMarks),
        attempts: parseInt(editingTest.attempts) || 1
      } : test
    );
    
    setOnlineTests(updatedTests);
    setEditingTest(null);
    alert('Test updated successfully!');
  }

  function handleDeleteTest(testId) {
    if (window.confirm('Are you sure you want to delete this test?')) {
      setOnlineTests(onlineTests.filter(test => test.id !== testId));
      setTestSubmissions(testSubmissions.filter(sub => sub.testId !== testId));
      alert('Test deleted successfully!');
    }
  }

  function handleViewTestDetails(testData) {
    setViewingTestDetails(testData);
  }

  function handleScoreUpdate(submissionId, newScore, feedback) {
    const updatedSubmissions = testSubmissions.map(sub =>
      sub.id === submissionId
        ? { 
            ...sub, 
            score: parseInt(newScore), 
            percentage: Math.round((parseInt(newScore) / sub.maxScore) * 100),
            feedback, 
            status: 'Completed' 
          }
        : sub
    );
    setTestSubmissions(updatedSubmissions);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-300">
      {/* Enhanced Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setShowSidebar(true)} /> 
          Online Test Dashboard
        </h1>
      </div>

      {/* Enhanced Mobile Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex md:hidden">
          <div className="bg-white dark:bg-slate-800 w-4/5 h-full p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filters</h2>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowSidebar(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tests or students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year
              <select 
                value={selectedYear} 
                onChange={e => setSelectedYear(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>
            
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Semester
              <select 
                value={selectedSemester} 
                onChange={e => setSelectedSemester(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Semesters</option>
                {semesters.map(se => <option key={se} value={se}>{se}</option>)}
              </select>
            </label>
            
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program
              <select 
                value={selectedProgram} 
                onChange={e => setSelectedProgram(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Programs</option>
                {programs.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject
              <select 
                value={selectedSubject} 
                onChange={e => setSelectedSubject(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Subjects</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>
          <div className="flex-1" onClick={() => setShowSidebar(false)}></div>
        </div>
      )}

      <div className="p-4 md:p-6 max-w-8xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Online Test Management</h1>
              <p className="text-indigo-100 text-lg">Monitor test submissions and student performance with advanced analytics</p>
            </div>
          </div>
        </div>

        {/* Enhanced Filters & Search */}
        <div className="hidden md:block bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tests, students, or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="">All Semesters</option>
                {semesters.map(semester => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="">All Programs</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 bg-white dark:bg-slate-800 rounded-t-2xl p-2">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 rounded-lg ${
              activeTab === 'submissions'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Test Overview ({Object.keys(groupedSubmissions).length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`flex-1 px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 rounded-lg ${
              activeTab === 'tests'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Manage Tests ({filteredTests.length})
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-b-2xl p-6">
          {activeTab === 'submissions' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Object.entries(groupedSubmissions).map(([testId, data]) => (
                <TestCard
                  key={testId}
                  test={data.test}
                  submissions={data.submissions}
                  onClick={() => handleViewTestDetails(data)}
                />
              ))}
            </div>
          )}

          {activeTab === 'tests' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  Test Management
                </h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 flex items-center gap-2 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" /> Add New Test
                </button>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTests.map(test => (
                  <div key={test.id} className="group bg-white dark:bg-slate-700 rounded-xl shadow-lg border border-gray-200 dark:border-slate-600 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {editingTest?.id === test.id ? (
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                          value={editingTest.title}
                          onChange={e => setEditingTest({...editingTest, title: e.target.value})}
                          placeholder="Test Title" 
                        />
                        
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editingTest.program || ''}
                          onChange={e => setEditingTest({...editingTest, program: e.target.value})}
                        >
                          <option value="">Select Program</option>
                          {programs.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editingTest.subject}
                          onChange={e => setEditingTest({...editingTest, subject: e.target.value})}
                        >
                          <option value="">Select Subject</option>
                          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <select 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={editingTest.year}
                            onChange={e => setEditingTest({...editingTest, year: e.target.value})}
                          >
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                          
                          <select 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={editingTest.semester}
                            onChange={e => setEditingTest({...editingTest, semester: e.target.value})}
                          >
                            <option value="">Semester</option>
                            {semesters.map(se => <option key={se} value={se}>{se}</option>)}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <input 
                            type="number" 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            value={editingTest.duration}
                            onChange={e => setEditingTest({...editingTest, duration: e.target.value})}
                            placeholder="Duration (min)"
                          />
                          <input 
                            type="number" 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            value={editingTest.totalQuestions}
                            onChange={e => setEditingTest({...editingTest, totalQuestions: e.target.value})}
                            placeholder="Questions"
                          />
                          <input 
                            type="number" 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            value={editingTest.totalMarks}
                            onChange={e => setEditingTest({...editingTest, totalMarks: e.target.value})}
                            placeholder="Marks"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSaveEdit}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center gap-1 font-medium transition-all duration-200"
                          >
                            <Save className="w-3 h-3" /> Save
                          </button>
                          <button 
                            onClick={() => setEditingTest(null)}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg text-sm hover:from-gray-600 hover:to-gray-700 flex items-center justify-center gap-1 font-medium transition-all duration-200"
                          >
                            <X className="w-3 h-3" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{test.title}</h3>
                          </div>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => handleViewTestDetails({test, submissions: testSubmissions.filter(s => s.testId === test.id)})}
                              className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditTest(test)}
                              className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all duration-200"
                              title="Edit Test"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTest(test.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                              title="Delete Test"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                            {test.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTestTypeColor(test.type)}`}>
                            {test.type}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3 h-3" />
                            <span><strong>Subject:</strong> {test.subject}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3 h-3" />
                            <span><strong>Program:</strong> {test.program}</span>
                          </div>
                          <div><strong>Year:</strong> {test.year} - {test.semester}</div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{test.startDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-3 h-3" />
                            <span>{test.totalMarks} marks • {test.duration} min</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleViewTestDetails({test, submissions: testSubmissions.filter(s => s.testId === test.id)})}
                          className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          <Users className="w-4 h-4" />
                          View Submissions ({testSubmissions.filter(s => s.testId === test.id).length})
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Add Test Modal */}
      {/* Enhanced Add Test Modal with Question Paper Upload and Questions */}
{showAddForm && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <Plus className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create New Test</h2>
        </div>
        <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Form Content */}
      <div className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Test Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.title}
                onChange={e => setNewTest({...newTest, title: e.target.value})}
                placeholder="Enter test title"
              />
            </div>
            
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                value={newTest.subject}
                onChange={e => setNewTest({...newTest, subject: e.target.value})}
              >
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            {/* Program */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Program <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                value={newTest.program}
                onChange={e => setNewTest({...newTest, program: e.target.value})}
              >
                <option value="">Select Program</option>
                {programs.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            
            {/* Year and Semester */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Year <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                value={newTest.year}
                onChange={e => setNewTest({...newTest, year: e.target.value})}
              >
                <option value="">Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Semester <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                value={newTest.semester}
                onChange={e => setNewTest({...newTest, semester: e.target.value})}
              >
                <option value="">Select Semester</option>
                {semesters.map(se => <option key={se} value={se}>{se}</option>)}
              </select>
            </div>
            
            {/* Test Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Test Type</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                value={newTest.type}
                onChange={e => setNewTest({...newTest, type: e.target.value})}
              >
                {testTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Test Configuration Section */}
        <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Test Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Duration (min) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.duration}
                onChange={e => setNewTest({...newTest, duration: e.target.value})}
                placeholder="60"
              />
            </div>
            
            {/* Questions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Questions <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.totalQuestions}
                onChange={e => setNewTest({...newTest, totalQuestions: e.target.value})}
                placeholder="20"
              />
            </div>
            
            {/* Total Marks */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Total Marks <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.totalMarks}
                onChange={e => setNewTest({...newTest, totalMarks: e.target.value})}
                placeholder="100"
              />
            </div>
            
            {/* Attempts Allowed */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Attempts Allowed</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.attempts}
                onChange={e => setNewTest({...newTest, attempts: e.target.value})}
                min="1"
                max="5"
                placeholder="1"
              />
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-purple-50 dark:bg-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.startDate}
                onChange={e => setNewTest({...newTest, startDate: e.target.value})}
              />
            </div>
            
            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.endDate}
                onChange={e => setNewTest({...newTest, endDate: e.target.value})}
              />
            </div>
            
            {/* Start Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
              <input 
                type="time" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.startTime}
                onChange={e => setNewTest({...newTest, startTime: e.target.value})}
              />
            </div>
            
            {/* End Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">End Time</label>
              <input 
                type="time" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.endTime}
                onChange={e => setNewTest({...newTest, endTime: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Question Paper Upload Section */}
        <div className="bg-green-50 dark:bg-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            <Upload className="inline w-5 h-5 mr-2" />
            Upload Question Paper
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Question Paper File (PDF, DOC, DOCX)
              </label>
              <div className="relative">
                <input 
                  type="file" 
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                  onChange={e => setNewTest({...newTest, questionPaper: e.target.files[0]})}
                  accept=".pdf,.doc,.docx"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Upload question paper in PDF, DOC, or DOCX format (Max 10MB)
              </p>
              {newTest.questionPaper && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-800 dark:text-green-300">{newTest.questionPaper.name}</span>
                  <button 
                    onClick={() => setNewTest({...newTest, questionPaper: null})}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Questions Section */}
        <div className="bg-yellow-50 dark:bg-slate-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              <FileText className="inline w-5 h-5 mr-2" />
              Add Questions
            </h3>
            <button
              type="button"
              onClick={() => {
                const newQuestion = {
                  id: Date.now(),
                  question: '',
                  type: 'multiple-choice',
                  options: ['', '', '', ''],
                  correctAnswer: '',
                  marks: 1
                };
                setNewTest({...newTest, questions: [...(newTest.questions || []), newQuestion]});
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 text-sm font-medium transition-all duration-200"
            >
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>

          {/* Questions List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {(newTest.questions || []).map((question, index) => (
              <div key={question.id} className="bg-white dark:bg-slate-600 rounded-lg p-4 border border-gray-200 dark:border-slate-500">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Question {index + 1}</h4>
                  <button
                    onClick={() => {
                      const updatedQuestions = newTest.questions.filter(q => q.id !== question.id);
                      setNewTest({...newTest, questions: updatedQuestions});
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {/* Question Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question Text</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={question.question}
                      onChange={e => {
                        const updatedQuestions = newTest.questions.map(q => 
                          q.id === question.id ? {...q, question: e.target.value} : q
                        );
                        setNewTest({...newTest, questions: updatedQuestions});
                      }}
                      placeholder="Enter question text"
                      rows={2}
                    />
                  </div>

                  {/* Question Type */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                        value={question.type}
                        onChange={e => {
                          const updatedQuestions = newTest.questions.map(q => 
                            q.id === question.id ? {...q, type: e.target.value} : q
                          );
                          setNewTest({...newTest, questions: updatedQuestions});
                        }}
                      >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                        <option value="short-answer">Short Answer</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marks</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                        value={question.marks}
                        onChange={e => {
                          const updatedQuestions = newTest.questions.map(q => 
                            q.id === question.id ? {...q, marks: parseInt(e.target.value) || 1} : q
                          );
                          setNewTest({...newTest, questions: updatedQuestions});
                        }}
                        min="1"
                        placeholder="1"
                      />
                    </div>
                  </div>

                  {/* Options for Multiple Choice */}
                  {question.type === 'multiple-choice' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options</label>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctAnswer === option}
                              onChange={() => {
                                const updatedQuestions = newTest.questions.map(q => 
                                  q.id === question.id ? {...q, correctAnswer: option} : q
                                );
                                setNewTest({...newTest, questions: updatedQuestions});
                              }}
                              className="text-indigo-600"
                            />
                            <input
                              type="text"
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                              value={option}
                              onChange={e => {
                                const newOptions = [...question.options];
                                newOptions[optionIndex] = e.target.value;
                                const updatedQuestions = newTest.questions.map(q => 
                                  q.id === question.id ? {...q, options: newOptions} : q
                                );
                                setNewTest({...newTest, questions: updatedQuestions});
                              }}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Select the radio button next to the correct answer
                      </p>
                    </div>
                  )}

                  {/* True/False Options */}
                  {question.type === 'true-false' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Correct Answer</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`tf-${question.id}`}
                            checked={question.correctAnswer === 'true'}
                            onChange={() => {
                              const updatedQuestions = newTest.questions.map(q => 
                                q.id === question.id ? {...q, correctAnswer: 'true'} : q
                              );
                              setNewTest({...newTest, questions: updatedQuestions});
                            }}
                            className="text-indigo-600"
                          />
                          <span className="text-sm text-gray-900 dark:text-gray-100">True</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`tf-${question.id}`}
                            checked={question.correctAnswer === 'false'}
                            onChange={() => {
                              const updatedQuestions = newTest.questions.map(q => 
                                q.id === question.id ? {...q, correctAnswer: 'false'} : q
                              );
                              setNewTest({...newTest, questions: updatedQuestions});
                            }}
                            className="text-indigo-600"
                          />
                          <span className="text-sm text-gray-900 dark:text-gray-100">False</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Short Answer */}
                  {question.type === 'short-answer' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sample Answer (for reference)</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                        value={question.correctAnswer}
                        onChange={e => {
                          const updatedQuestions = newTest.questions.map(q => 
                            q.id === question.id ? {...q, correctAnswer: e.target.value} : q
                          );
                          setNewTest({...newTest, questions: updatedQuestions});
                        }}
                        placeholder="Enter sample answer"
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {(!newTest.questions || newTest.questions.length === 0) && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No questions added yet. Click "Add Question" to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Description and Instructions Section */}
        <div className="bg-orange-50 dark:bg-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.description}
                onChange={e => setNewTest({...newTest, description: e.target.value})}
                placeholder="Enter test description"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Instructions</label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                value={newTest.instructions}
                onChange={e => setNewTest({...newTest, instructions: e.target.value})}
                placeholder="Enter test instructions for students"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={handleAddTest}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" /> Create Test
        </button>
        <button
          onClick={() => setShowAddForm(false)}
          className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 flex items-center justify-center gap-2 font-semibold transition-all duration-300"
        >
          <X className="w-5 h-5" /> Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Test Details Modal - Keep existing implementation */}
      {viewingTestDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {viewingTestDetails.test.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {viewingTestDetails.test.subject} - {viewingTestDetails.test.program}
                  </p>
                </div>
                <button
                  onClick={() => setViewingTestDetails(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Test Info Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {viewingTestDetails.submissions.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</div>
                </div>
                <div className="bg-emerald-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {viewingTestDetails.submissions.filter(s => s.status === 'Completed').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                </div>
                <div className="bg-purple-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {viewingTestDetails.test.totalMarks}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Max Marks</div>
                </div>
                <div className="bg-orange-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {viewingTestDetails.test.duration}m
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                </div>
              </div>

              {/* Student Submissions Grid */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Student Submissions ({viewingTestDetails.submissions.length})
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {viewingTestDetails.submissions.map(submission => (
                    <StudentSubmissionCard
                      key={submission.id}
                      submission={submission}
                      onClick={setViewingSubmission}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Submission Details Modal - Keep existing implementation */}
      {viewingSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Student Submission Details
                </h2>
                <button
                  onClick={() => setViewingSubmission(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Student Information */}
              <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Student Information</h3>
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-emerald-50 dark:bg-slate-700 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{viewingSubmission.score}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{viewingSubmission.percentage}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Percentage</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-slate-700 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{viewingSubmission.timeTaken}m</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Time Taken</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-slate-700 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{viewingSubmission.attempts}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Attempts Used</div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Question Analysis</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Total Questions:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{viewingSubmission.totalQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-700 dark:text-emerald-300">Correct Answers:</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{viewingSubmission.correctAnswers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-red-700 dark:text-red-300">Wrong Answers:</span>
                          <span className="font-semibold text-red-600 dark:text-red-400">{viewingSubmission.wrongAnswers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Unanswered:</span>
                          <span className="font-semibold text-gray-600 dark:text-gray-400">{viewingSubmission.unanswered}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Time Analysis</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Start Time:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{viewingSubmission.startTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">End Time:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{viewingSubmission.endTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Total Duration:</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{viewingSubmission.timeTaken} minutes</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Submission Date:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{viewingSubmission.submittedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div className="bg-amber-50 dark:bg-slate-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">HOD Feedback</h4>
                    <textarea
                      defaultValue={viewingSubmission.feedback}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      rows="4"
                      placeholder="Enter feedback for the student's performance..."
                    />
                    <div className="flex justify-end mt-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 font-semibold transition-all duration-300">
                        Save Feedback
                      </button>
                    </div>
                  </div>
                </>
              )}

              {viewingSubmission.status === 'Not Started' && (
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-8 text-center">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Test Not Started</h3>
                  <p className="text-gray-600 dark:text-gray-300">This student has not yet started the test.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Edit className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Score</h2>
              </div>
              <button onClick={() => setGradingSubmission(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Student:</strong> {gradingSubmission.studentName} ({gradingSubmission.studentId})
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Score (out of {gradingSubmission.maxScore})
                </label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                  defaultValue={gradingSubmission.score || ''}
                  min="0"
                  max={gradingSubmission.maxScore}
                  onChange={e => setGradingSubmission({...gradingSubmission, score: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Feedback</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                  defaultValue={gradingSubmission.feedback || ''}
                  onChange={e => setGradingSubmission({...gradingSubmission, feedback: e.target.value})}
                  placeholder="Enter feedback for the student"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  handleScoreUpdate(gradingSubmission.id, gradingSubmission.score, gradingSubmission.feedback);
                  setGradingSubmission(null);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Save className="w-5 h-5" /> Save Changes
              </button>
              <button
                onClick={() => setGradingSubmission(null)}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 font-semibold transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineTestHod;
