import React, { useState, useEffect } from 'react';
import { 
  Plus, Eye, Edit, Save, X, Code, Clock, Users, Award, Calendar, FileText, 
  Timer, CheckCircle, AlertCircle, TrendingUp, BarChart3, Play, Bug, GitBranch, 
  Cpu, Menu, Upload, Minus, PlusCircle 
} from 'lucide-react';

const CodingAssessments = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showSidebar, setShowSidebar] = useState(false); // Mobile sidebar
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Enhanced data arrays for better organization
  const subjects = [
    'Data Structures & Algorithms', 'Web Development', 'Database Management', 
    'Machine Learning', 'Software Engineering', 'Mobile App Development',
    'Computer Networks', 'Operating Systems', 'Artificial Intelligence'
  ];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['1st Semester', '2nd Semester'];
  const programmingLanguages = ['Python', 'Java', 'JavaScript', 'C++', 'C#', 'Go', 'Rust', 'TypeScript'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Expert'];
  const assessmentTypes = ['Algorithm Challenge', 'System Design', 'Debug Challenge', 'Full Stack Project', 'Data Analysis'];

  // Helper functions for hierarchical sorting
  const getYearOrder = (year) => {
    const yearMap = { '1st Year': 1, '2nd Year': 2, '3rd Year': 3, '4th Year': 4 };
    return yearMap[year] || 0;
  };

  const getSemesterOrder = (semester) => {
    const semesterMap = { '1st Semester': 1, '2nd Semester': 2 };
    return semesterMap[semester] || 0;
  };

  // Enhanced coding assessments data with comprehensive coverage
  const [codingAssessments, setCodingAssessments] = useState([
    // 1st Year Assessments
    {
      id: 1,
      title: 'Basic Programming Fundamentals',
      subject: 'Data Structures & Algorithms',
      year: '1st Year',
      semester: '1st Semester',
      type: 'Algorithm Challenge',
      language: ['Python', 'Java'],
      difficulty: 'Easy',
      timeLimit: 60,
      totalProblems: 2,
      totalMarks: 50,
      startDate: '2024-12-01',
      endDate: '2024-12-03',
      description: 'Introduction to loops, conditionals, and basic data types',
      testCases: 8,
      memoryLimit: '128MB',
      executionLimit: '1s',
      plagiarismCheck: true,
      autoGrading: true,
      codeReview: false,
      status: 'Active',
      createdDate: '2024-11-25',
      questionPaper: null,
      problems: []
    },
    {
      id: 2,
      title: 'HTML/CSS Basics',
      subject: 'Web Development',
      year: '1st Year',
      semester: '1st Semester',
      type: 'Full Stack Project',
      language: ['JavaScript'],
      difficulty: 'Easy',
      timeLimit: 90,
      totalProblems: 3,
      totalMarks: 60,
      startDate: '2024-12-05',
      endDate: '2024-12-07',
      description: 'Create basic web pages with HTML and CSS styling',
      testCases: 10,
      memoryLimit: '128MB',
      executionLimit: '1s',
      plagiarismCheck: false,
      autoGrading: false,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-11-26',
      questionPaper: null,
      problems: []
    },
    {
      id: 3,
      title: 'Introduction to SQL',
      subject: 'Database Management',
      year: '1st Year',
      semester: '2nd Semester',
      type: 'Data Analysis',
      language: ['Python'],
      difficulty: 'Easy',
      timeLimit: 75,
      totalProblems: 4,
      totalMarks: 70,
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      description: 'Basic SELECT queries and database operations',
      testCases: 12,
      memoryLimit: '256MB',
      executionLimit: '2s',
      plagiarismCheck: true,
      autoGrading: true,
      codeReview: false,
      status: 'Scheduled',
      createdDate: '2024-11-28',
      questionPaper: null,
      problems: []
    },
    {
      id: 4,
      title: 'Mobile UI Design Basics',
      subject: 'Mobile App Development',
      year: '1st Year',
      semester: '2nd Semester',
      type: 'Full Stack Project',
      language: ['JavaScript'],
      difficulty: 'Medium',
      timeLimit: 120,
      totalProblems: 2,
      totalMarks: 80,
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      description: 'Design responsive mobile interfaces using React Native',
      testCases: 15,
      memoryLimit: '512MB',
      executionLimit: '5s',
      plagiarismCheck: true,
      autoGrading: false,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-12-01',
      questionPaper: null,
      problems: []
    },

    // 2nd Year Assessments
    {
      id: 5,
      title: 'Binary Search Tree Implementation',
      subject: 'Data Structures & Algorithms',
      year: '2nd Year',
      semester: '1st Semester',
      type: 'Algorithm Challenge',
      language: ['Python', 'Java', 'C++'],
      difficulty: 'Medium',
      timeLimit: 120,
      totalProblems: 3,
      totalMarks: 100,
      startDate: '2024-12-01',
      endDate: '2024-12-03',
      description: 'Implement various BST operations including insertion, deletion, and traversal',
      testCases: 15,
      memoryLimit: '256MB',
      executionLimit: '2s',
      plagiarismCheck: true,
      autoGrading: true,
      codeReview: true,
      status: 'Active',
      createdDate: '2024-11-25',
      questionPaper: null,
      problems: []
    },
    {
      id: 6,
      title: 'React Component Architecture',
      subject: 'Web Development',
      year: '2nd Year',
      semester: '1st Semester',
      type: 'Full Stack Project',
      language: ['JavaScript', 'TypeScript'],
      difficulty: 'Medium',
      timeLimit: 180,
      totalProblems: 4,
      totalMarks: 120,
      startDate: '2024-12-08',
      endDate: '2024-12-10',
      description: 'Build reusable React components with proper state management',
      testCases: 20,
      memoryLimit: '512MB',
      executionLimit: '3s',
      plagiarismCheck: true,
      autoGrading: false,
      codeReview: true,
      status: 'Active',
      createdDate: '2024-11-27',
      questionPaper: null,
      problems: []
    },
    {
      id: 7,
      title: 'Database Normalization & Queries',
      subject: 'Database Management',
      year: '2nd Year',
      semester: '2nd Semester',
      type: 'Data Analysis',
      language: ['Python'],
      difficulty: 'Medium',
      timeLimit: 150,
      totalProblems: 5,
      totalMarks: 110,
      startDate: '2025-01-25',
      endDate: '2025-01-27',
      description: 'Advanced SQL queries, joins, and database design principles',
      testCases: 18,
      memoryLimit: '256MB',
      executionLimit: '2s',
      plagiarismCheck: true,
      autoGrading: true,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-12-02',
      questionPaper: null,
      problems: []
    },
    {
      id: 8,
      title: 'Cross-Platform Mobile App',
      subject: 'Mobile App Development',
      year: '2nd Year',
      semester: '2nd Semester',
      type: 'Full Stack Project',
      language: ['JavaScript', 'TypeScript'],
      difficulty: 'Hard',
      timeLimit: 240,
      totalProblems: 3,
      totalMarks: 150,
      startDate: '2025-02-01',
      endDate: '2025-02-03',
      description: 'Build a complete mobile application with API integration',
      testCases: 25,
      memoryLimit: '1GB',
      executionLimit: '5s',
      plagiarismCheck: true,
      autoGrading: false,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-12-05',
      questionPaper: null,
      problems: []
    },

    // 3rd Year Assessments
    {
      id: 9,
      title: 'Advanced Graph Algorithms',
      subject: 'Data Structures & Algorithms',
      year: '3rd Year',
      semester: '1st Semester',
      type: 'Algorithm Challenge',
      language: ['Python', 'C++', 'Java'],
      difficulty: 'Hard',
      timeLimit: 180,
      totalProblems: 4,
      totalMarks: 140,
      startDate: '2024-12-10',
      endDate: '2024-12-12',
      description: 'Dijkstra, Bellman-Ford, and MST algorithms implementation',
      testCases: 22,
      memoryLimit: '512MB',
      executionLimit: '3s',
      plagiarismCheck: true,
      autoGrading: true,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-11-28',
      questionPaper: null,
      problems: []
    },
    {
      id: 10,
      title: 'E-commerce REST API Development',
      subject: 'Web Development',
      year: '3rd Year',
      semester: '1st Semester',
      type: 'Full Stack Project',
      language: ['JavaScript', 'TypeScript'],
      difficulty: 'Hard',
      timeLimit: 240,
      totalProblems: 5,
      totalMarks: 150,
      startDate: '2024-12-10',
      endDate: '2024-12-15',
      description: 'Build a complete REST API for an e-commerce platform with authentication and CRUD operations',
      testCases: 25,
      memoryLimit: '512MB',
      executionLimit: '5s',
      plagiarismCheck: true,
      autoGrading: false,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-11-20',
      questionPaper: null,
      problems: []
    },
    {
      id: 11,
      title: 'Machine Learning Model Implementation',
      subject: 'Machine Learning',
      year: '3rd Year',
      semester: '2nd Semester',
      type: 'Data Analysis',
      language: ['Python'],
      difficulty: 'Hard',
      timeLimit: 300,
      totalProblems: 3,
      totalMarks: 180,
      startDate: '2025-02-15',
      endDate: '2025-02-17',
      description: 'Implement and train linear regression and decision tree models',
      testCases: 30,
      memoryLimit: '1GB',
      executionLimit: '10s',
      plagiarismCheck: true,
      autoGrading: true,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-12-08',
      questionPaper: null,
      problems: []
    },
    {
      id: 12,
      title: 'Network Protocol Implementation',
      subject: 'Computer Networks',
      year: '3rd Year',
      semester: '2nd Semester',
      type: 'System Design',
      language: ['C++', 'Java'],
      difficulty: 'Expert',
      timeLimit: 360,
      totalProblems: 2,
      totalMarks: 200,
      startDate: '2025-02-20',
      endDate: '2025-02-22',
      description: 'Implement TCP/UDP socket programming and packet analysis',
      testCases: 35,
      memoryLimit: '512MB',
      executionLimit: '5s',
      plagiarismCheck: true,
      autoGrading: false,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-12-10',
      questionPaper: null,
      problems: []
    },

    // 4th Year Assessments
    {
      id: 13,
      title: 'Distributed Systems Design',
      subject: 'Software Engineering',
      year: '4th Year',
      semester: '1st Semester',
      type: 'System Design',
      language: ['Java', 'Python', 'Go'],
      difficulty: 'Expert',
      timeLimit: 480,
      totalProblems: 2,
      totalMarks: 250,
      startDate: '2025-01-30',
      endDate: '2025-02-01',
      description: 'Design and implement a distributed cache system with fault tolerance',
      testCases: 40,
      memoryLimit: '1GB',
      executionLimit: '10s',
      plagiarismCheck: true,
      autoGrading: false,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-12-15',
      questionPaper: null,
      problems: []
    },
    {
      id: 14,
      title: 'Deep Learning Neural Networks',
      subject: 'Artificial Intelligence',
      year: '4th Year',
      semester: '1st Semester',
      type: 'Data Analysis',
      language: ['Python'],
      difficulty: 'Expert',
      timeLimit: 420,
      totalProblems: 3,
      totalMarks: 300,
      startDate: '2025-02-25',
      endDate: '2025-02-28',
      description: 'Build and train CNN and RNN models for image and text processing',
      testCases: 45,
      memoryLimit: '2GB',
      executionLimit: '15s',
      plagiarismCheck: true,
      autoGrading: true,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-12-18',
      questionPaper: null,
      problems: []
    },
    {
      id: 15,
      title: 'Operating System Kernel Module',
      subject: 'Operating Systems',
      year: '4th Year',
      semester: '2nd Semester',
      type: 'System Design',
      language: ['C++', 'C'],
      difficulty: 'Expert',
      timeLimit: 360,
      totalProblems: 2,
      totalMarks: 280,
      startDate: '2025-03-15',
      endDate: '2025-03-18',
      description: 'Implement process scheduling and memory management algorithms',
      testCases: 50,
      memoryLimit: '512MB',
      executionLimit: '5s',
      plagiarismCheck: true,
      autoGrading: false,
      codeReview: true,
      status: 'Scheduled',
      createdDate: '2024-12-20',
      questionPaper: null,
      problems: []
    }
  ]);

  // Enhanced coding submissions with comprehensive student data
  const [codingSubmissions, setCodingSubmissions] = useState([
    // 1st Year Submissions
    {
      id: 1,
      assessmentId: 1,
      studentName: 'Aarav Sharma',
      studentId: 'CS101',
      subject: 'Data Structures & Algorithms',
      year: '1st Year',
      semester: '1st Semester',
      submittedDate: '2024-12-01',
      startTime: '10:15:00',
      endTime: '11:05:00',
      timeTaken: 50,
      language: 'Python',
      status: 'Completed',
      score: 42,
      maxScore: 50,
      percentage: 84,
      problemsSolved: 2,
      totalProblems: 2,
      testCasesPassed: 7,
      totalTestCases: 8,
      executionTime: '0.8s',
      memoryUsed: '64MB',
      linesOfCode: 85,
      cyclomatic: 4,
      codeQuality: 'Good',
      plagiarismScore: 3,
      bugs: 1,
      warnings: 0,
      feedback: 'Good grasp of basic programming concepts',
      codeSnippet: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`
    },
    {
      id: 2,
      assessmentId: 2,
      studentName: 'Priya Patel',
      studentId: 'WD101',
      subject: 'Web Development',
      year: '1st Year',
      semester: '1st Semester',
      submittedDate: '2024-12-05',
      startTime: '14:30:00',
      endTime: '15:45:00',
      timeTaken: 75,
      language: 'JavaScript',
      status: 'Completed',
      score: 52,
      maxScore: 60,
      percentage: 87,
      problemsSolved: 3,
      totalProblems: 3,
      testCasesPassed: 9,
      totalTestCases: 10,
      executionTime: '0.5s',
      memoryUsed: '45MB',
      linesOfCode: 120,
      cyclomatic: 3,
      codeQuality: 'Excellent',
      plagiarismScore: 2,
      bugs: 0,
      warnings: 1,
      feedback: 'Beautiful HTML structure and CSS styling',
      codeSnippet: `<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to My Portfolio</h1>
</body>
</html>`
    },

    // 2nd Year Submissions
    {
      id: 5,
      assessmentId: 5,
      studentName: 'Alice Johnson',
      studentId: 'CS201',
      subject: 'Data Structures & Algorithms',
      year: '2nd Year',
      semester: '1st Semester',
      submittedDate: '2024-12-01',
      startTime: '10:15:00',
      endTime: '12:05:00',
      timeTaken: 110,
      language: 'Python',
      status: 'Completed',
      score: 85,
      maxScore: 100,
      percentage: 85,
      problemsSolved: 3,
      totalProblems: 3,
      testCasesPassed: 13,
      totalTestCases: 15,
      executionTime: '1.2s',
      memoryUsed: '128MB',
      linesOfCode: 245,
      cyclomatic: 8,
      codeQuality: 'Good',
      plagiarismScore: 5,
      bugs: 2,
      warnings: 1,
      feedback: 'Excellent algorithm implementation with optimal time complexity',
      codeSnippet: `def insert_bst(root, key):
    if root is None:
        return TreeNode(key)
    if key < root.val:
        root.left = insert_bst(root.left, key)
    else:
        root.right = insert_bst(root.right, key)
    return root`
    },
    {
      id: 6,
      assessmentId: 6,
      studentName: 'Bob Smith',
      studentId: 'WD201',
      subject: 'Web Development',
      year: '2nd Year',
      semester: '1st Semester',
      submittedDate: '2024-12-08',
      startTime: '11:30:00',
      endTime: '14:15:00',
      timeTaken: 165,
      language: 'TypeScript',
      status: 'Completed',
      score: 108,
      maxScore: 120,
      percentage: 90,
      problemsSolved: 4,
      totalProblems: 4,
      testCasesPassed: 18,
      totalTestCases: 20,
      executionTime: '2.1s',
      memoryUsed: '256MB',
      linesOfCode: 420,
      cyclomatic: 12,
      codeQuality: 'Excellent',
      plagiarismScore: 1,
      bugs: 0,
      warnings: 2,
      feedback: 'Outstanding React component architecture with proper TypeScript usage',
      codeSnippet: `interface Props {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
};`
    },
   
    // 3rd Year Submissions
   
   
  ]);

  const [newAssessment, setNewAssessment] = useState({
    title: '',
    subject: '',
    year: '',
    semester: '',
    type: 'Algorithm Challenge',
    language: [],
    difficulty: 'Medium',
    timeLimit: '',
    totalProblems: '',
    totalMarks: '',
    startDate: '',
    endDate: '',
    description: '',
    testCases: '',
    memoryLimit: '256MB',
    executionLimit: '2s',
    plagiarismCheck: true,
    autoGrading: true,
    codeReview: true,
    questionPaper: null,
    problems: []
  });

  // Current problem being added
  const [currentProblem, setCurrentProblem] = useState({
    title: '',
    description: '',
    difficulty: 'Medium',
    marks: 1,
    timeLimit: 60,
    memoryLimit: '256MB',
    sampleInput: '',
    sampleOutput: '',
    explanation: '',
    constraints: '',
    testCases: []
  });

  // Enhanced filtering and sorting with hierarchical order: Year -> Semester -> Subject
  const filteredSubmissions = codingSubmissions
    .filter(submission => {
      return (
        (!selectedSubject || submission.subject === selectedSubject) &&
        (!selectedYear || submission.year === selectedYear) &&
        (!selectedSemester || submission.semester === selectedSemester)
      );
    })
    .sort((a, b) => {
      // Sort by Year first, then Semester, then Subject
      const yearA = getYearOrder(a.year);
      const yearB = getYearOrder(b.year);
      if (yearA !== yearB) return yearA - yearB;
      
      const semesterA = getSemesterOrder(a.semester);
      const semesterB = getSemesterOrder(b.semester);
      if (semesterA !== semesterB) return semesterA - semesterB;
      
      return a.subject.localeCompare(b.subject);
    });

  const filteredAssessments = codingAssessments
    .filter(assessment => {
      return (
        (!selectedSubject || assessment.subject === selectedSubject) &&
        (!selectedYear || assessment.year === selectedYear) &&
        (!selectedSemester || assessment.semester === selectedSemester)
      );
    })
    .sort((a, b) => {
      // Sort by Year first, then Semester, then Subject
      const yearA = getYearOrder(a.year);
      const yearB = getYearOrder(b.year);
      if (yearA !== yearB) return yearA - yearB;
      
      const semesterA = getSemesterOrder(a.semester);
      const semesterB = getSemesterOrder(b.semester);
      if (semesterA !== semesterB) return semesterA - semesterB;
      
      return a.subject.localeCompare(b.subject);
    });

  const handleAddAssessment = () => {
    if (newAssessment.title && newAssessment.subject && newAssessment.year && newAssessment.semester) {
      const assessment = {
        ...newAssessment,
        id: codingAssessments.length + 1,
        timeLimit: parseInt(newAssessment.timeLimit),
        totalProblems: parseInt(newAssessment.totalProblems),
        totalMarks: parseInt(newAssessment.totalMarks),
        testCases: parseInt(newAssessment.testCases),
        status: new Date(newAssessment.startDate) > new Date() ? 'Scheduled' : 'Active',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setCodingAssessments([...codingAssessments, assessment]);
      setNewAssessment({
        title: '',
        subject: '',
        year: '',
        semester: '',
        type: 'Algorithm Challenge',
        language: [],
        difficulty: 'Medium',
        timeLimit: '',
        totalProblems: '',
        totalMarks: '',
        startDate: '',
        endDate: '',
        description: '',
        testCases: '',
        memoryLimit: '256MB',
        executionLimit: '2s',
        plagiarismCheck: true,
        autoGrading: true,
        codeReview: true,
        questionPaper: null,
        problems: []
      });
      setCurrentProblem({
        title: '',
        description: '',
        difficulty: 'Medium',
        marks: 1,
        timeLimit: 60,
        memoryLimit: '256MB',
        sampleInput: '',
        sampleOutput: '',
        explanation: '',
        constraints: '',
        testCases: []
      });
      setShowAddForm(false);
    }
  };

  const handleEditAssessment = (assessment) => {
    setEditingAssessment({...assessment});
  };

  const handleSaveEdit = () => {
    setCodingAssessments(codingAssessments.map(a => 
      a.id === editingAssessment.id ? editingAssessment : a
    ));
    setEditingAssessment(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAssessment({...newAssessment, questionPaper: file});
    }
  };

  const handleAddProblem = () => {
    if (currentProblem.title.trim() && currentProblem.description.trim()) {
      const problem = {
        ...currentProblem,
        id: newAssessment.problems.length + 1
      };
      setNewAssessment({
        ...newAssessment,
        problems: [...newAssessment.problems, problem]
      });
      setCurrentProblem({
        title: '',
        description: '',
        difficulty: 'Medium',
        marks: 1,
        timeLimit: 60,
        memoryLimit: '256MB',
        sampleInput: '',
        sampleOutput: '',
        explanation: '',
        constraints: '',
        testCases: []
      });
    }
  };

  const handleRemoveProblem = (index) => {
    const updatedProblems = newAssessment.problems.filter((_, i) => i !== index);
    setNewAssessment({...newAssessment, problems: updatedProblems});
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 75) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getCodeQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent': return 'text-green-600 dark:text-green-400';
      case 'Good': return 'text-blue-600 dark:text-blue-400';
      case 'Fair': return 'text-yellow-600 dark:text-yellow-400';
      case 'Poor': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Analytics data
  const getAnalyticsData = () => {
    const completed = filteredSubmissions.filter(s => s.status === 'Completed');
    const totalStudents = filteredSubmissions.length;
    const avgScore = completed.length > 0 ? completed.reduce((sum, s) => sum + s.percentage, 0) / completed.length : 0;
    const avgExecutionTime = completed.length > 0 ? completed.reduce((sum, s) => sum + parseFloat(s.executionTime || 0), 0) / completed.length : 0;
    
    return {
      totalAssessments: filteredAssessments.length,
      totalStudents: totalStudents,
      completedSubmissions: completed.length,
      avgScore: avgScore.toFixed(1),
      avgExecutionTime: avgExecutionTime.toFixed(2),
      completionRate: totalStudents > 0 ? ((completed.length / totalStudents) * 100).toFixed(1) : 0
    };
  };

  const analytics = getAnalyticsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-emerald-600 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setShowSidebar(true)} /> 
          Coding Assessments
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

      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-colors duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-4 lg:p-6 rounded-t-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center">
                <Code className="w-8 h-8 mr-3" />
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">Coding Assessments Hub</h1>
                  <p className="text-emerald-100">Manage coding challenges and evaluate programming skills</p>
                </div>
              </div>
              <div className="flex items-center mt-4 lg:mt-0 space-x-4">
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Panel */}
          {showAnalytics && (
            <div className="p-4 lg:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-800 border-b dark:border-slate-600">
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{analytics.totalAssessments}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Assessments</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{analytics.totalStudents}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Students</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{analytics.completedSubmissions}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{analytics.avgScore}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{analytics.avgExecutionTime}s</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Avg Runtime</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{analytics.completionRate}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</div>
                </div>
              </div>
            </div>
          )}

          {/* Filters - Hierarchical Order: Year, Semester, Subject */}
          <div className="hidden md:block p-4 lg:p-6 border-b bg-gray-50 dark:bg-slate-700 dark:border-slate-600 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                >
                  <option value="">All Semesters</option>
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
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
                  ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Code Submissions ({filteredSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-4 lg:px-6 py-3 font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'assessments'
                  ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Manage Assessments ({filteredAssessments.length})
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
                            {submission.language && (
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium w-fit flex items-center gap-1">
                                <Code className="w-3 h-3" />
                                {submission.language}
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                            <div><strong>Year:</strong> {submission.year}</div>
                            <div><strong>Semester:</strong> {submission.semester}</div>
                            <div><strong>Subject:</strong> {submission.subject}</div>
                            <div><strong>Submitted:</strong> {submission.submittedDate || 'Not yet'}</div>
                          </div>

                          {submission.status === 'Completed' && (
                            <>
                              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 mb-3">
                                <div className="bg-green-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                                  <div className={`text-lg lg:text-xl font-bold ${getPerformanceColor(submission.percentage)}`}>
                                    {submission.score}/{submission.maxScore}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Score</div>
                                </div>
                                <div className="bg-blue-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                                  <div className="text-lg lg:text-xl font-bold text-blue-600 dark:text-blue-400">
                                    {submission.testCasesPassed}/{submission.totalTestCases}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Test Cases</div>
                                </div>
                                <div className="bg-purple-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                                  <div className="text-lg lg:text-xl font-bold text-purple-600 dark:text-purple-400">
                                    {submission.executionTime}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Runtime</div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                                  <div className="text-lg lg:text-xl font-bold text-yellow-600 dark:text-yellow-400">
                                    {submission.memoryUsed}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Memory</div>
                                </div>
                                <div className="bg-pink-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                                  <div className="text-lg lg:text-xl font-bold text-pink-600 dark:text-pink-400">
                                    {submission.linesOfCode}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Lines</div>
                                </div>
                                <div className="bg-indigo-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                                  <div className={`text-lg lg:text-xl font-bold ${getCodeQualityColor(submission.codeQuality)}`}>
                                    {submission.codeQuality || 'N/A'}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">Code Quality</div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                  <Award className="w-3 h-3" /> {submission.percentage}%
                                </span>
                                <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                  <Bug className="w-3 h-3" /> Bugs: {submission.bugs}
                                </span>
                                <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                  <AlertCircle className="w-3 h-3" /> Warnings: {submission.warnings}
                                </span>
                                <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                  <TrendingUp className="w-3 h-3" /> Cyclomatic: {submission.cyclomatic}
                                </span>
                                <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                  <CheckCircle className="w-3 h-3" /> Plagiarism: {submission.plagiarismScore}%
                                </span>
                              </div>
                              <div className="mb-2">
                                <strong>Feedback:</strong> {submission.feedback}
                              </div>
                              {submission.codeSnippet && (
                                <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 text-xs overflow-x-auto mt-2">
                                  {submission.codeSnippet}
                                </pre>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <button
                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                            onClick={() => setViewingSubmission(submission)}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Submission Modal */}
                {viewingSubmission && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                      <button
                        className="absolute top-3 right-3 text-gray-700 dark:text-gray-300"
                        onClick={() => setViewingSubmission(null)}
                      >
                        <X className="w-6 h-6" />
                      </button>
                      <h2 className="text-xl font-bold mb-4">Submission Details</h2>
                      <div className="mb-2"><strong>Student:</strong> {viewingSubmission.studentName} ({viewingSubmission.studentId})</div>
                      <div className="mb-2"><strong>Subject:</strong> {viewingSubmission.subject}</div>
                      <div className="mb-2"><strong>Status:</strong> {viewingSubmission.status}</div>
                      <div className="mb-2"><strong>Score:</strong> {viewingSubmission.score}/{viewingSubmission.maxScore}</div>
                      <div className="mb-2"><strong>Test Cases:</strong> {viewingSubmission.testCasesPassed}/{viewingSubmission.totalTestCases}</div>
                      <div className="mb-2"><strong>Execution Time:</strong> {viewingSubmission.executionTime}</div>
                      <div className="mb-2"><strong>Memory Used:</strong> {viewingSubmission.memoryUsed}</div>
                      <div className="mb-2"><strong>Code Quality:</strong> {viewingSubmission.codeQuality}</div>
                      <div className="mb-2"><strong>Feedback:</strong> {viewingSubmission.feedback}</div>
                      {viewingSubmission.codeSnippet && (
                        <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 text-xs overflow-x-auto mt-2">
                          {viewingSubmission.codeSnippet}
                        </pre>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Manage Assessments Tab */}
            {activeTab === 'assessments' && (
              <div>
                {/* Add New Assessment Button */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Manage Coding Assessments
                  </h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Coding Assessment
                  </button>
                </div>

                {/* Assessments Grid */}
                <div className="grid gap-4">
                  {filteredAssessments.map(assessment => (
                    <div key={assessment.id} className="border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{assessment.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(assessment.status)}`}>
                              {assessment.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getDifficultyColor(assessment.difficulty)}`}>
                              {assessment.difficulty}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium w-fit">
                              {assessment.type}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                            <div><strong>Year:</strong> {assessment.year}</div>
                            <div><strong>Semester:</strong> {assessment.semester}</div>
                            <div><strong>Subject:</strong> {assessment.subject}</div>
                            <div><strong>Languages:</strong> {assessment.language.join(', ')}</div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 mb-3">
                            <div className="bg-green-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                              <div className="text-lg lg:text-xl font-bold text-green-600 dark:text-green-400">
                                {assessment.totalMarks}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Total Marks</div>
                            </div>
                            <div className="bg-blue-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                              <div className="text-lg lg:text-xl font-bold text-blue-600 dark:text-blue-400">
                                {assessment.totalProblems}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Problems</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                              <div className="text-lg lg:text-xl font-bold text-purple-600 dark:text-purple-400">
                                {assessment.timeLimit}m
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Time Limit</div>
                            </div>
                            <div className="bg-yellow-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                              <div className="text-lg lg:text-xl font-bold text-yellow-600 dark:text-yellow-400">
                                {assessment.testCases}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Test Cases</div>
                            </div>
                            <div className="bg-pink-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                              <div className="text-lg lg:text-xl font-bold text-pink-600 dark:text-pink-400">
                                {assessment.memoryLimit}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Memory Limit</div>
                            </div>
                            <div className="bg-indigo-50 dark:bg-slate-600 rounded-lg p-2 lg:p-3 text-center">
                              <div className="text-lg lg:text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                {assessment.executionLimit}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Execution Limit</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <Calendar className="w-3 h-3" /> Start: {assessment.startDate}
                            </span>
                            <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <Calendar className="w-3 h-3" /> End: {assessment.endDate}
                            </span>
                            <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <CheckCircle className="w-3 h-3" /> Plagiarism: {assessment.plagiarismCheck ? 'Yes' : 'No'}
                            </span>
                            <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <Cpu className="w-3 h-3" /> Auto Grade: {assessment.autoGrading ? 'Yes' : 'No'}
                            </span>
                            <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <FileText className="w-3 h-3" /> Code Review: {assessment.codeReview ? 'Yes' : 'No'}
                            </span>
                          </div>

                          <div className="mb-2">
                            <strong>Description:</strong> {assessment.description}
                          </div>

                          {/* Show question paper and problems info */}
                          {assessment.questionPaper && (
                            <div className="bg-blue-50 dark:bg-slate-600 rounded-lg p-3 mt-3">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Question Paper:</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                <strong>File:</strong> {assessment.questionPaper.name}
                              </p>
                            </div>
                          )}
                          
                          {assessment.problems && assessment.problems.length > 0 && (
                            <div className="bg-green-50 dark:bg-slate-600 rounded-lg p-3 mt-3">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Added Problems:</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {assessment.problems.length} coding problems manually added
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 min-w-[120px]">
                         
                          <button
                            onClick={() => handleEditAssessment(assessment)}
                            className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Add Assessment Form Modal */}
                {showAddForm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
                      <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-600 p-4 lg:p-6">
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Coding Assessment</h2>
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
                          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Basic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Assessment Title *
                              </label>
                              <input
                                type="text"
                                value={newAssessment.title}
                                onChange={(e) => setNewAssessment({...newAssessment, title: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                                placeholder="Enter assessment title"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subject *
                              </label>
                              <select
                                value={newAssessment.subject}
                                onChange={(e) => setNewAssessment({...newAssessment, subject: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              >
                                <option value="">Select Subject</option>
                                {subjects.map(subject => (
                                  <option key={subject} value={subject}>{subject}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Year *
                              </label>
                              <select
                                value={newAssessment.year}
                                onChange={(e) => setNewAssessment({...newAssessment, year: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              >
                                <option value="">Select Year</option>
                                {years.map(year => (
                                  <option key={year} value={year}>{year}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Semester *
                              </label>
                              <select
                                value={newAssessment.semester}
                                onChange={(e) => setNewAssessment({...newAssessment, semester: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              >
                                <option value="">Select Semester</option>
                                {semesters.map(semester => (
                                  <option key={semester} value={semester}>{semester}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Description *
                            </label>
                            <textarea
                              value={newAssessment.description}
                              onChange={(e) => setNewAssessment({...newAssessment, description: e.target.value})}
                              rows="3"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              placeholder="Enter assessment description"
                            />
                          </div>
                        </div>

                        {/* Assessment Configuration */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Assessment Configuration</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Assessment Type
                              </label>
                              <select
                                value={newAssessment.type}
                                onChange={(e) => setNewAssessment({...newAssessment, type: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              >
                                {assessmentTypes.map(type => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Difficulty Level
                              </label>
                              <select
                                value={newAssessment.difficulty}
                                onChange={(e) => setNewAssessment({...newAssessment, difficulty: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              >
                                {difficultyLevels.map(level => (
                                  <option key={level} value={level}>{level}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Programming Languages
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {programmingLanguages.map(lang => (
                                <label key={lang} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={newAssessment.language.includes(lang)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setNewAssessment({
                                          ...newAssessment,
                                          language: [...newAssessment.language, lang]
                                        });
                                      } else {
                                        setNewAssessment({
                                          ...newAssessment,
                                          language: newAssessment.language.filter(l => l !== lang)
                                        });
                                      }
                                    }}
                                    className="mr-2"
                                  />
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{lang}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Time Limit (minutes) *
                              </label>
                              <input
                                type="number"
                                value={newAssessment.timeLimit}
                                onChange={(e) => setNewAssessment({...newAssessment, timeLimit: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                                placeholder="Enter time limit"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Total Problems *
                              </label>
                              <input
                                type="number"
                                value={newAssessment.totalProblems}
                                onChange={(e) => setNewAssessment({...newAssessment, totalProblems: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                                placeholder="Enter number of problems"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Total Marks *
                              </label>
                              <input
                                type="number"
                                value={newAssessment.totalMarks}
                                onChange={(e) => setNewAssessment({...newAssessment, totalMarks: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                                placeholder="Enter total marks"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Test Cases *
                              </label>
                              <input
                                type="number"
                                value={newAssessment.testCases}
                                onChange={(e) => setNewAssessment({...newAssessment, testCases: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                                placeholder="Enter number of test cases"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Memory Limit
                              </label>
                              <select
                                value={newAssessment.memoryLimit}
                                onChange={(e) => setNewAssessment({...newAssessment, memoryLimit: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              >
                                <option value="128MB">128MB</option>
                                <option value="256MB">256MB</option>
                                <option value="512MB">512MB</option>
                                <option value="1GB">1GB</option>
                                <option value="2GB">2GB</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Execution Limit
                              </label>
                              <select
                                value={newAssessment.executionLimit}
                                onChange={(e) => setNewAssessment({...newAssessment, executionLimit: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              >
                                <option value="1s">1 second</option>
                                <option value="2s">2 seconds</option>
                                <option value="3s">3 seconds</option>
                                <option value="5s">5 seconds</option>
                                <option value="10s">10 seconds</option>
                                <option value="15s">15 seconds</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Schedule */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Schedule</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Start Date *
                              </label>
                              <input
                                type="date"
                                value={newAssessment.startDate}
                                onChange={(e) => setNewAssessment({...newAssessment, startDate: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                End Date *
                              </label>
                              <input
                                type="date"
                                value={newAssessment.endDate}
                                onChange={(e) => setNewAssessment({...newAssessment, endDate: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Question Paper Upload */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Upload Question Paper</h3>
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
                                  Upload a document containing all coding problems
                                </p>
                              </div>
                            </div>
                            {newAssessment.questionPaper && (
                              <div className="mt-4 p-3 bg-green-50 dark:bg-slate-700 rounded-md">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-green-400" />
                                  <span className="ml-2 text-sm text-green-700 dark:text-green-300">
                                    {newAssessment.questionPaper.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setNewAssessment({...newAssessment, questionPaper: null})}
                                    className="ml-auto text-green-600 hover:text-green-800"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Manual Problem Addition */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Add Coding Problems Manually</h3>
                          
                          {/* Current Problem Form */}
                          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-4">
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Problem Title</label>
                                  <input
                                    type="text"
                                    value={currentProblem.title}
                                    onChange={(e) => setCurrentProblem({...currentProblem, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                    placeholder="Enter problem title..."
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                                  <select
                                    value={currentProblem.difficulty}
                                    onChange={(e) => setCurrentProblem({...currentProblem, difficulty: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                  >
                                    {difficultyLevels.map(level => (
                                      <option key={level} value={level}>{level}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Problem Description</label>
                                <textarea
                                  value={currentProblem.description}
                                  onChange={(e) => setCurrentProblem({...currentProblem, description: e.target.value})}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                  rows="4"
                                  placeholder="Enter detailed problem description..."
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marks</label>
                                  <input
                                    type="number"
                                    value={currentProblem.marks}
                                    onChange={(e) => setCurrentProblem({...currentProblem, marks: parseInt(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                    min="1"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Limit (minutes)</label>
                                  <input
                                    type="number"
                                    value={currentProblem.timeLimit}
                                    onChange={(e) => setCurrentProblem({...currentProblem, timeLimit: parseInt(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                    min="1"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Memory Limit</label>
                                  <select
                                    value={currentProblem.memoryLimit}
                                    onChange={(e) => setCurrentProblem({...currentProblem, memoryLimit: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                  >
                                    <option value="128MB">128MB</option>
                                    <option value="256MB">256MB</option>
                                    <option value="512MB">512MB</option>
                                    <option value="1GB">1GB</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Input</label>
                                  <textarea
                                    value={currentProblem.sampleInput}
                                    onChange={(e) => setCurrentProblem({...currentProblem, sampleInput: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300 font-mono text-sm"
                                    rows="3"
                                    placeholder="Enter sample input..."
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Output</label>
                                  <textarea
                                    value={currentProblem.sampleOutput}
                                    onChange={(e) => setCurrentProblem({...currentProblem, sampleOutput: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300 font-mono text-sm"
                                    rows="3"
                                    placeholder="Enter expected output..."
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Explanation</label>
                                <textarea
                                  value={currentProblem.explanation}
                                  onChange={(e) => setCurrentProblem({...currentProblem, explanation: e.target.value})}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                  rows="2"
                                  placeholder="Explain the solution approach..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Constraints</label>
                                <textarea
                                  value={currentProblem.constraints}
                                  onChange={(e) => setCurrentProblem({...currentProblem, constraints: e.target.value})}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                                  rows="2"
                                  placeholder="Enter problem constraints..."
                                />
                              </div>

                              <button
                                type="button"
                                onClick={handleAddProblem}
                                className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                              >
                                <Plus className="h-4 w-4" />
                                Add Problem
                              </button>
                            </div>
                          </div>

                          {/* Added Problems List */}
                          {newAssessment.problems.length > 0 && (
                            <div>
                              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Added Problems ({newAssessment.problems.length})
                              </h4>
                              <div className="space-y-3 max-h-60 overflow-y-auto">
                                {newAssessment.problems.map((problem, index) => (
                                  <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-600">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 rounded text-xs">
                                            Problem {index + 1}
                                          </span>
                                          <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(problem.difficulty)}`}>
                                            {problem.difficulty}
                                          </span>
                                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs">
                                            {problem.marks} marks
                                          </span>
                                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                            {problem.timeLimit}min
                                          </span>
                                        </div>
                                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                                          {problem.title}
                                        </h5>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                          {problem.description}
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveProblem(index)}
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

                        {/* Settings */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Settings</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={newAssessment.plagiarismCheck}
                                onChange={(e) => setNewAssessment({...newAssessment, plagiarismCheck: e.target.checked})}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">Enable Plagiarism Check</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={newAssessment.autoGrading}
                                onChange={(e) => setNewAssessment({...newAssessment, autoGrading: e.target.checked})}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">Enable Auto Grading</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={newAssessment.codeReview}
                                onChange={(e) => setNewAssessment({...newAssessment, codeReview: e.target.checked})}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">Enable Code Review</span>
                            </label>
                          </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t dark:border-slate-600">
                          <button
                            type="button"
                            onClick={handleAddAssessment}
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2 justify-center font-medium"
                          >
                            <Plus className="w-5 h-5" />
                            Create Assessment
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2 justify-center font-medium"
                          >
                            <X className="w-5 h-5" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Assessment Modal */}
                {editingAssessment && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Coding Assessment</h2>
                          <button
                            onClick={() => setEditingAssessment(null)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Assessment Title *
                            </label>
                            <input
                              type="text"
                              value={editingAssessment.title}
                              onChange={(e) => setEditingAssessment({...editingAssessment, title: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Subject *
                            </label>
                            <select
                              value={editingAssessment.subject}
                              onChange={(e) => setEditingAssessment({...editingAssessment, subject: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                            >
                              {subjects.map(subject => (
                                <option key={subject} value={subject}>{subject}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Time Limit (minutes) *
                            </label>
                            <input
                              type="number"
                              value={editingAssessment.timeLimit}
                              onChange={(e) => setEditingAssessment({...editingAssessment, timeLimit: parseInt(e.target.value)})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Total Marks *
                            </label>
                            <input
                              type="number"
                              value={editingAssessment.totalMarks}
                              onChange={(e) => setEditingAssessment({...editingAssessment, totalMarks: parseInt(e.target.value)})}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Description *
                            </label>
                            <textarea
                              value={editingAssessment.description}
                              onChange={(e) => setEditingAssessment({...editingAssessment, description: e.target.value})}
                              rows="3"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                            />
                          </div>
                        </form>

                        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
                          <button
                            type="button"
                            onClick={() => setEditingAssessment(null)}
                            className="px-6 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveEdit}
                            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingAssessments;
