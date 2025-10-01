import React, { useState, useEffect } from 'react';
import { 
  Plus, Eye, Edit, Save, X, Code, Clock, Users, Award, Calendar, FileText, 
  Timer, CheckCircle, AlertCircle, TrendingUp, BarChart3, Play, Bug, GitBranch, 
  Cpu, Menu, Upload, Minus, PlusCircle, User, Search, Trash2
} from 'lucide-react';

const CodingAssessments = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [viewingAssessmentDetails, setViewingAssessmentDetails] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced data arrays
  const subjects = [
    'Data Structures & Algorithms', 'Web Development', 'Database Management', 
    'Machine Learning', 'Software Engineering', 'Mobile App Development',
    'Computer Networks', 'Operating Systems', 'Artificial Intelligence'
  ];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['1st Semester', '2nd Semester'];
  const programs = ['B.Tech CSE', 'M.Tech CSE', 'B.Tech IT', 'M.Tech IT', 'B.Tech ECE', 'M.Tech ECE'];
  const programmingLanguages = ['Python', 'Java', 'JavaScript', 'C++', 'C#', 'Go', 'Rust', 'TypeScript'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Expert'];
  const assessmentTypes = ['Algorithm Challenge', 'System Design', 'Debug Challenge', 'Full Stack Project', 'Data Analysis'];

  // Helper functions
  const getYearOrder = (year) => {
    const yearMap = { '1st Year': 1, '2nd Year': 2, '3rd Year': 3, '4th Year': 4 };
    return yearMap[year] || 0;
  };

  const getSemesterOrder = (semester) => {
    const semesterMap = { '1st Semester': 1, '2nd Semester': 2 };
    return semesterMap[semester] || 0;
  };

  // Coding assessments data
  const [codingAssessments, setCodingAssessments] = useState([
    {
      id: 1,
      title: 'Basic Programming Fundamentals',
      subject: 'Data Structures & Algorithms',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
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
      title: 'Binary Search Tree Implementation',
      subject: 'Data Structures & Algorithms',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
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
      id: 3,
      title: 'React Component Architecture',
      subject: 'Web Development',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'B.Tech IT',
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
      id: 4,
      title: 'Advanced Graph Algorithms',
      subject: 'Data Structures & Algorithms',
      year: '3rd Year',
      semester: '1st Semester',
      program: 'M.Tech CSE',
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
    }
  ]);

  // Coding submissions data
  const [codingSubmissions, setCodingSubmissions] = useState([
    {
      id: 1,
      assessmentId: 1,
      studentName: 'Aarav Sharma',
      studentId: 'CS101',
      subject: 'Data Structures & Algorithms',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
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
      studentName: 'Alice Johnson',
      studentId: 'CS201',
      subject: 'Data Structures & Algorithms',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
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
      codeSnippet: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def insert_bst(root, key):
    if root is None:
        return TreeNode(key)
    if key < root.val:
        root.left = insert_bst(root.left, key)
    else:
        root.right = insert_bst(root.right, key)
    return root`
    },
    {
      id: 3,
      assessmentId: 3,
      studentName: 'Bob Smith',
      studentId: 'WD201',
      subject: 'Web Development',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'B.Tech IT',
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
    {
      id: 4,
      assessmentId: 1,
      studentName: 'Priya Patel',
      studentId: 'CS102',
      subject: 'Data Structures & Algorithms',
      year: '1st Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
      submittedDate: '2024-12-01',
      startTime: '09:30:00',
      endTime: '10:25:00',
      timeTaken: 55,
      language: 'Java',
      status: 'Completed',
      score: 46,
      maxScore: 50,
      percentage: 92,
      problemsSolved: 2,
      totalProblems: 2,
      testCasesPassed: 8,
      totalTestCases: 8,
      executionTime: '0.6s',
      memoryUsed: '72MB',
      linesOfCode: 95,
      cyclomatic: 5,
      codeQuality: 'Excellent',
      plagiarismScore: 2,
      bugs: 0,
      warnings: 0,
      feedback: 'Perfect implementation with clean code structure',
      codeSnippet: `public class Solution {
    public int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
}`
    },
    {
      id: 5,
      assessmentId: 2,
      studentName: 'Charlie Brown',
      studentId: 'CS202',
      subject: 'Data Structures & Algorithms',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'B.Tech CSE',
      submittedDate: '2024-12-01',
      startTime: '11:00:00',
      endTime: '12:45:00',
      timeTaken: 105,
      language: 'C++',
      status: 'Completed',
      score: 78,
      maxScore: 100,
      percentage: 78,
      problemsSolved: 3,
      totalProblems: 3,
      testCasesPassed: 12,
      totalTestCases: 15,
      executionTime: '1.5s',
      memoryUsed: '140MB',
      linesOfCode: 180,
      cyclomatic: 7,
      codeQuality: 'Good',
      plagiarismScore: 4,
      bugs: 1,
      warnings: 2,
      feedback: 'Good approach but some edge cases need attention',
      codeSnippet: `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}`
    },
    {
      id: 6,
      assessmentId: 3,
      studentName: 'Diana Prince',
      studentId: 'WD202',
      subject: 'Web Development',
      year: '2nd Year',
      semester: '1st Semester',
      program: 'B.Tech IT',
      submittedDate: '2024-12-08',
      startTime: '12:00:00',
      endTime: '14:50:00',
      timeTaken: 170,
      language: 'JavaScript',
      status: 'Completed',
      score: 95,
      maxScore: 120,
      percentage: 79,
      problemsSolved: 3,
      totalProblems: 4,
      testCasesPassed: 16,
      totalTestCases: 20,
      executionTime: '2.8s',
      memoryUsed: '200MB',
      linesOfCode: 380,
      cyclomatic: 10,
      codeQuality: 'Good',
      plagiarismScore: 3,
      bugs: 1,
      warnings: 3,
      feedback: 'Good React fundamentals, needs improvement in state management',
      codeSnippet: `const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};`
    }
  ]);

  const [newAssessment, setNewAssessment] = useState({
    title: '',
    subject: '',
    year: '',
    semester: '',
    program: '',
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

  // Filtering with search
  const filteredSubmissions = codingSubmissions
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

  const filteredAssessments = codingAssessments
    .filter(assessment => {
      const matchesSearch = searchQuery === '' || 
        assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      return (
        matchesSearch &&
        (!selectedSubject || assessment.subject === selectedSubject) &&
        (!selectedYear || assessment.year === selectedYear) &&
        (!selectedSemester || assessment.semester === selectedSemester) &&
        (!selectedProgram || assessment.program === selectedProgram)
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

  // Group submissions by assessment
  const groupedSubmissions = filteredSubmissions.reduce((acc, submission) => {
    const assessment = codingAssessments.find(a => a.id === submission.assessmentId);
    if (assessment) {
      if (!acc[submission.assessmentId]) {
        acc[submission.assessmentId] = {
          assessment: assessment,
          submissions: []
        };
      }
      acc[submission.assessmentId].submissions.push(submission);
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Hard': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (percentage >= 75) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getCodeQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent': return 'text-emerald-600 dark:text-emerald-400';
      case 'Good': return 'text-blue-600 dark:text-blue-400';
      case 'Fair': return 'text-amber-600 dark:text-amber-400';
      case 'Poor': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getAssessmentTypeColor = (type) => {
    switch (type) {
      case 'Algorithm Challenge': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'System Design': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Debug Challenge': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Full Stack Project': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Data Analysis': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Enhanced Assessment Card Component
  const AssessmentCard = ({ assessment, submissions, onClick }) => {
    const totalSubmissions = submissions.length;
    const completedSubmissions = submissions.filter(s => s.status === 'Completed').length;
    const avgScore = completedSubmissions > 0 ? 
      (submissions.filter(s => s.status === 'Completed').reduce((sum, s) => sum + s.percentage, 0) / completedSubmissions).toFixed(1) : 0;

    return (
      <div className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-600 p-6 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500 cursor-pointer transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {assessment.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(assessment.status)}`}>
                {assessment.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAssessmentTypeColor(assessment.type)}`}>
                {assessment.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(assessment.difficulty)}`}>
                {assessment.difficulty}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{assessment.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{assessment.program} - {assessment.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{assessment.semester}</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>{assessment.language.join(', ')}</span>
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
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{assessment.timeLimit}m</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{assessment.startDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>{assessment.totalMarks} marks</span>
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
            <div className="flex items-center gap-1 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                {submission.status}
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium">
                {submission.language}
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
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center bg-gray-50 dark:bg-gray-900/20 rounded-lg p-2">
            <div className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {submission.testCasesPassed}/{submission.totalTestCases}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tests</div>
          </div>
          <div className="text-center bg-gray-50 dark:bg-gray-900/20 rounded-lg p-2">
            <div className={`text-sm font-bold ${getCodeQualityColor(submission.codeQuality)}`}>
              {submission.codeQuality}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Quality</div>
          </div>
        </div>
        
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

  // Handle functions
  function handleAddAssessment() {
    if (!newAssessment.title.trim()) {
      alert('Please enter an assessment title');
      return;
    }
    if (!newAssessment.subject) {
      alert('Please select a subject');
      return;
    }
    if (!newAssessment.year) {
      alert('Please select a year');
      return;
    }
    if (!newAssessment.semester) {
      alert('Please select a semester');
      return;
    }
    if (!newAssessment.program) {
      alert('Please select a program');
      return;
    }

    const assessment = {
      ...newAssessment,
      id: Math.max(...codingAssessments.map(a => a.id), 0) + 1,
      timeLimit: parseInt(newAssessment.timeLimit),
      totalProblems: parseInt(newAssessment.totalProblems),
      totalMarks: parseInt(newAssessment.totalMarks),
      testCases: parseInt(newAssessment.testCases),
      status: new Date(newAssessment.startDate) > new Date() ? 'Scheduled' : 'Active',
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    setCodingAssessments([...codingAssessments, assessment]);
    
    // Reset form
    setNewAssessment({
      title: '',
      subject: '',
      year: '',
      semester: '',
      program: '',
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
    alert('Assessment created successfully!');
  }

  function handleEditAssessment(assessment) {
    setEditingAssessment({ ...assessment });
  }

  function handleSaveEdit() {
    if (!editingAssessment.title.trim()) {
      alert('Please enter an assessment title');
      return;
    }
    
    const updatedAssessments = codingAssessments.map(assessment =>
      assessment.id === editingAssessment.id ? {
        ...editingAssessment,
        timeLimit: parseInt(editingAssessment.timeLimit),
        totalProblems: parseInt(editingAssessment.totalProblems),
        totalMarks: parseInt(editingAssessment.totalMarks),
        testCases: parseInt(editingAssessment.testCases)
      } : assessment
    );
    
    setCodingAssessments(updatedAssessments);
    setEditingAssessment(null);
    alert('Assessment updated successfully!');
  }

  function handleDeleteAssessment(assessmentId) {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      setCodingAssessments(codingAssessments.filter(assessment => assessment.id !== assessmentId));
      setCodingSubmissions(codingSubmissions.filter(sub => sub.assessmentId !== assessmentId));
      alert('Assessment deleted successfully!');
    }
  }

  function handleViewAssessmentDetails(assessmentData) {
    setViewingAssessmentDetails(assessmentData);
  }

  function handleScoreUpdate(submissionId, newScore, feedback) {
    const updatedSubmissions = codingSubmissions.map(sub =>
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
    setCodingSubmissions(updatedSubmissions);
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-300">
      {/* Enhanced Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setShowSidebar(true)} /> 
          Coding Assessments
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
                placeholder="Search assessments or students..."
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
              <Code className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Coding Assessments</h1>
              <p className="text-indigo-100 text-lg">Manage coding challenges and evaluate programming skills with advanced analytics</p>
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
                  placeholder="Search assessments, students, or subjects..."
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
              Assessment Overview ({Object.keys(groupedSubmissions).length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className={`flex-1 px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 rounded-lg ${
              activeTab === 'assessments'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Code className="w-4 h-4" />
              Manage Assessments ({filteredAssessments.length})
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-b-2xl p-6">
          {activeTab === 'submissions' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Object.entries(groupedSubmissions).map(([assessmentId, data]) => (
                <AssessmentCard
                  key={assessmentId}
                  assessment={data.assessment}
                  submissions={data.submissions}
                  onClick={() => handleViewAssessmentDetails(data)}
                />
              ))}
            </div>
          )}

          {activeTab === 'assessments' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  Assessment Management
                </h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 flex items-center gap-2 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" /> Add New Assessment
                </button>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAssessments.map(assessment => (
                  <div key={assessment.id} className="group bg-white dark:bg-slate-700 rounded-xl shadow-lg border border-gray-200 dark:border-slate-600 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {editingAssessment?.id === assessment.id ? (
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                          value={editingAssessment.title}
                          onChange={e => setEditingAssessment({...editingAssessment, title: e.target.value})}
                          placeholder="Assessment Title" 
                        />
                        
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editingAssessment.program || ''}
                          onChange={e => setEditingAssessment({...editingAssessment, program: e.target.value})}
                        >
                          <option value="">Select Program</option>
                          {programs.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editingAssessment.subject}
                          onChange={e => setEditingAssessment({...editingAssessment, subject: e.target.value})}
                        >
                          <option value="">Select Subject</option>
                          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <select 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={editingAssessment.year}
                            onChange={e => setEditingAssessment({...editingAssessment, year: e.target.value})}
                          >
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                          
                          <select 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={editingAssessment.semester}
                            onChange={e => setEditingAssessment({...editingAssessment, semester: e.target.value})}
                          >
                            <option value="">Semester</option>
                            {semesters.map(se => <option key={se} value={se}>{se}</option>)}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <input 
                            type="number" 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            value={editingAssessment.timeLimit}
                            onChange={e => setEditingAssessment({...editingAssessment, timeLimit: e.target.value})}
                            placeholder="Time (min)"
                          />
                          <input 
                            type="number" 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            value={editingAssessment.totalProblems}
                            onChange={e => setEditingAssessment({...editingAssessment, totalProblems: e.target.value})}
                            placeholder="Problems"
                          />
                          <input 
                            type="number" 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            value={editingAssessment.totalMarks}
                            onChange={e => setEditingAssessment({...editingAssessment, totalMarks: e.target.value})}
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
                            onClick={() => setEditingAssessment(null)}
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
                            <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{assessment.title}</h3>
                          </div>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => handleViewAssessmentDetails({assessment, submissions: codingSubmissions.filter(s => s.assessmentId === assessment.id)})}
                              className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditAssessment(assessment)}
                              className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all duration-200"
                              title="Edit Assessment"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteAssessment(assessment.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                              title="Delete Assessment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                            {assessment.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAssessmentTypeColor(assessment.type)}`}>
                            {assessment.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                            {assessment.difficulty}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3 h-3" />
                            <span><strong>Subject:</strong> {assessment.subject}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3 h-3" />
                            <span><strong>Program:</strong> {assessment.program}</span>
                          </div>
                          <div><strong>Year:</strong> {assessment.year} - {assessment.semester}</div>
                          <div className="flex items-center gap-2">
                            <Code className="w-3 h-3" />
                            <span>{assessment.language.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{assessment.startDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-3 h-3" />
                            <span>{assessment.totalMarks} marks • {assessment.timeLimit} min</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleViewAssessmentDetails({assessment, submissions: codingSubmissions.filter(s => s.assessmentId === assessment.id)})}
                          className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          <Users className="w-4 h-4" />
                          View Submissions ({codingSubmissions.filter(s => s.assessmentId === assessment.id).length})
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

      {/* Assessment Details Modal */}
      {viewingAssessmentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {viewingAssessmentDetails.assessment.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {viewingAssessmentDetails.assessment.subject} - {viewingAssessmentDetails.assessment.program}
                  </p>
                </div>
                <button
                  onClick={() => setViewingAssessmentDetails(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Assessment Info Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {viewingAssessmentDetails.submissions.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</div>
                </div>
                <div className="bg-emerald-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {viewingAssessmentDetails.submissions.filter(s => s.status === 'Completed').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                </div>
                <div className="bg-purple-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {viewingAssessmentDetails.assessment.totalMarks}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Max Marks</div>
                </div>
                <div className="bg-orange-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {viewingAssessmentDetails.assessment.timeLimit}m
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                </div>
              </div>

              {/* Student Submissions Grid */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Student Submissions ({viewingAssessmentDetails.submissions.length})
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {viewingAssessmentDetails.submissions.map(submission => (
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

      {/* Student Submission Details Modal */}
      {viewingSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Code Submission Details
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
                  <div><strong className="text-gray-700 dark:text-gray-300">Language:</strong> <span className="text-gray-900 dark:text-gray-100">{viewingSubmission.language}</span></div>
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
                      <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{viewingSubmission.problemsSolved}/{viewingSubmission.totalProblems}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</div>
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Test Results</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Test Cases Passed:</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{viewingSubmission.testCasesPassed}/{viewingSubmission.totalTestCases}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Execution Time:</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{viewingSubmission.executionTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Memory Used:</span>
                          <span className="font-semibold text-purple-600 dark:text-purple-400">{viewingSubmission.memoryUsed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Code Quality:</span>
                          <span className={`font-semibold ${getCodeQualityColor(viewingSubmission.codeQuality)}`}>{viewingSubmission.codeQuality}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Code Analysis</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Lines of Code:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{viewingSubmission.linesOfCode}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Cyclomatic Complexity:</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{viewingSubmission.cyclomatic}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-red-700 dark:text-red-300">Bugs Found:</span>
                          <span className="font-semibold text-red-600 dark:text-red-400">{viewingSubmission.bugs}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-700 dark:text-yellow-300">Warnings:</span>
                          <span className="font-semibold text-yellow-600 dark:text-yellow-400">{viewingSubmission.warnings}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Plagiarism Score:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{viewingSubmission.plagiarismScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time Analysis */}
                  <div className="bg-indigo-50 dark:bg-slate-700 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Time Analysis</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{viewingSubmission.startTime}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Start Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{viewingSubmission.endTime}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">End Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{viewingSubmission.timeTaken} min</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{viewingSubmission.submittedDate}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Submission Date</div>
                      </div>
                    </div>
                  </div>

                  {/* Code Preview */}
                  {viewingSubmission.codeSnippet && (
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Code Preview</h4>
                      <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-x-auto">
                        <code>{viewingSubmission.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Assessment Not Started</h3>
                  <p className="text-gray-600 dark:text-gray-300">This student has not yet started the coding assessment.</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Language:</strong> {gradingSubmission.language}
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

      {/* Enhanced Add Assessment Modal with Question Paper Upload and Problems */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Plus className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create New Coding Assessment</h2>
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
                  {/* Assessment Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Assessment Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                      value={newAssessment.title}
                      onChange={e => setNewAssessment({...newAssessment, title: e.target.value})}
                      placeholder="Enter assessment title"
                    />
                  </div>
                  
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      value={newAssessment.subject}
                      onChange={e => setNewAssessment({...newAssessment, subject: e.target.value})}
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
                      value={newAssessment.program}
                      onChange={e => setNewAssessment({...newAssessment, program: e.target.value})}
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
                      value={newAssessment.year}
                      onChange={e => setNewAssessment({...newAssessment, year: e.target.value})}
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
                      value={newAssessment.semester}
                      onChange={e => setNewAssessment({...newAssessment, semester: e.target.value})}
                    >
                      <option value="">Select Semester</option>
                      {semesters.map(se => <option key={se} value={se}>{se}</option>)}
                    </select>
                  </div>
                  
                  {/* Assessment Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assessment Type</label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      value={newAssessment.type}
                      onChange={e => setNewAssessment({...newAssessment, type: e.target.value})}
                    >
                      {assessmentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      value={newAssessment.difficulty}
                      onChange={e => setNewAssessment({...newAssessment, difficulty: e.target.value})}
                    >
                      {difficultyLevels.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Programming Languages Section */}
              <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Programming Languages</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {programmingLanguages.map(lang => (
                    <label key={lang} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newAssessment.language.includes(lang)}
                        onChange={e => {
                          if (e.target.checked) {
                            setNewAssessment({...newAssessment, language: [...newAssessment.language, lang]});
                          } else {
                            setNewAssessment({...newAssessment, language: newAssessment.language.filter(l => l !== lang)});
                          }
                        }}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Assessment Configuration Section */}
              <div className="bg-purple-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Assessment Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Time Limit */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Time Limit (min) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                      value={newAssessment.timeLimit}
                      onChange={e => setNewAssessment({...newAssessment, timeLimit: e.target.value})}
                      placeholder="120"
                    />
                  </div>
                  
                  {/* Total Problems */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Total Problems <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                      value={newAssessment.totalProblems}
                      onChange={e => setNewAssessment({...newAssessment, totalProblems: e.target.value})}
                      placeholder="3"
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
                      value={newAssessment.totalMarks}
                      onChange={e => setNewAssessment({...newAssessment, totalMarks: e.target.value})}
                      placeholder="100"
                    />
                  </div>
                  
                  {/* Test Cases */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Test Cases</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                      value={newAssessment.testCases}
                      onChange={e => setNewAssessment({...newAssessment, testCases: e.target.value})}
                      placeholder="15"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Memory Limit</label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      value={newAssessment.memoryLimit}
                      onChange={e => setNewAssessment({...newAssessment, memoryLimit: e.target.value})}
                    >
                      <option value="128MB">128MB</option>
                      <option value="256MB">256MB</option>
                      <option value="512MB">512MB</option>
                      <option value="1GB">1GB</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Execution Time Limit</label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      value={newAssessment.executionLimit}
                      onChange={e => setNewAssessment({...newAssessment, executionLimit: e.target.value})}
                    >
                      <option value="1s">1 second</option>
                      <option value="2s">2 seconds</option>
                      <option value="3s">3 seconds</option>
                      <option value="5s">5 seconds</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule Section */}
              <div className="bg-orange-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                      value={newAssessment.startDate}
                      onChange={e => setNewAssessment({...newAssessment, startDate: e.target.value})}
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
                      value={newAssessment.endDate}
                      onChange={e => setNewAssessment({...newAssessment, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Assessment Features Section */}
              <div className="bg-indigo-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Assessment Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newAssessment.plagiarismCheck}
                      onChange={e => setNewAssessment({...newAssessment, plagiarismCheck: e.target.checked})}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Plagiarism Check</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Detect code similarity</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newAssessment.autoGrading}
                      onChange={e => setNewAssessment({...newAssessment, autoGrading: e.target.checked})}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Grading</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Automatic test case evaluation</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newAssessment.codeReview}
                      onChange={e => setNewAssessment({...newAssessment, codeReview: e.target.checked})}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Code Review</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Manual code evaluation</p>
                    </div>
                  </label>
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
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Upload className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Upload question paper in PDF, DOC, or DOCX format (Max 10MB)
                    </p>
                    {newAssessment.questionPaper && (
                      <div className="flex items-center gap-2 mt-2 p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-green-800 dark:text-green-300">{newAssessment.questionPaper.name}</span>
                        <button 
                          onClick={() => setNewAssessment({...newAssessment, questionPaper: null})}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Add Problems Section */}
              <div className="bg-yellow-50 dark:bg-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <Code className="inline w-5 h-5 mr-2" />
                    Coding Problems
                  </h3>
                </div>

                {/* Current Problem Form */}
                <div className="bg-white dark:bg-slate-600 rounded-lg p-4 mb-4 border border-gray-200 dark:border-slate-500">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Add New Problem</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Problem Title</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={currentProblem.title}
                        onChange={e => setCurrentProblem({...currentProblem, title: e.target.value})}
                        placeholder="Enter problem title"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                          value={currentProblem.difficulty}
                          onChange={e => setCurrentProblem({...currentProblem, difficulty: e.target.value})}
                        >
                          {difficultyLevels.map(level => <option key={level} value={level}>{level}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marks</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                          value={currentProblem.marks}
                          onChange={e => setCurrentProblem({...currentProblem, marks: parseInt(e.target.value) || 1})}
                          min="1"
                          placeholder="10"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time (min)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                          value={currentProblem.timeLimit}
                          onChange={e => setCurrentProblem({...currentProblem, timeLimit: parseInt(e.target.value) || 60})}
                          min="1"
                          placeholder="60"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Problem Description</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={currentProblem.description}
                        onChange={e => setCurrentProblem({...currentProblem, description: e.target.value})}
                        placeholder="Describe the problem statement"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sample Input</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                          value={currentProblem.sampleInput}
                          onChange={e => setCurrentProblem({...currentProblem, sampleInput: e.target.value})}
                          placeholder="Enter sample input"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sample Output</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                          value={currentProblem.sampleOutput}
                          onChange={e => setCurrentProblem({...currentProblem, sampleOutput: e.target.value})}
                          placeholder="Enter expected output"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Constraints</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={currentProblem.constraints}
                        onChange={e => setCurrentProblem({...currentProblem, constraints: e.target.value})}
                        placeholder="Enter problem constraints"
                        rows={2}
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleAddProblem}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 text-sm font-medium transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" /> Add Problem
                      </button>
                    </div>
                  </div>
                </div>

                {/* Problems List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {newAssessment.problems.map((problem, index) => (
                    <div key={index} className="bg-white dark:bg-slate-600 rounded-lg p-4 border border-gray-200 dark:border-slate-500">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          Problem {index + 1}: {problem.title}
                        </h4>
                        <button
                          onClick={() => handleRemoveProblem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div><strong>Difficulty:</strong> {problem.difficulty}</div>
                        <div><strong>Marks:</strong> {problem.marks}</div>
                        <div><strong>Time:</strong> {problem.timeLimit} min</div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                        {problem.description}
                      </p>
                    </div>
                  ))}

                  {/* Empty State */}
                  {newAssessment.problems.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No problems added yet. Add problems to create the assessment.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-pink-50 dark:bg-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Additional Information</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assessment Description</label>
                  <textarea 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                    value={newAssessment.description}
                    onChange={e => setNewAssessment({...newAssessment, description: e.target.value})}
                    placeholder="Enter detailed assessment description"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={handleAddAssessment}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5" /> Create Assessment
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
    </div>
  );
};

export default CodingAssessments;
