import React, { useState } from 'react';
import {
  Plus,
  Eye,
  Edit,
  Save,
  X,
  FileText,
  Calendar,
  User,
  Award,
  Menu,
  Upload,
  File
} from 'lucide-react';

const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Economics'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const semesters = ['1st Semester', '2nd Semester'];

// Enhanced assignments data with more entries
const assignmentsDemo = [
  // 1st Year Assignments
  {
    id: 1,
    title: 'Introduction to Programming',
    subject: 'Computer Science',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-10',
    totalMarks: 50,
    description: 'Basic programming concepts in Python.',
    createdDate: '2024-10-15',
    questionPaper: 'intro_programming_questions.pdf',
    questions: '1. Write a Python program to find factorial of a number.\n2. Create a function to check if a number is prime.\n3. Implement bubble sort algorithm.'
  },
  {
    id: 2,
    title: 'Algebra Fundamentals',
    subject: 'Mathematics',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-12',
    totalMarks: 40,
    description: 'Linear equations and basic algebraic operations.',
    createdDate: '2024-10-18',
    questionPaper: 'algebra_questions.pdf',
    questions: '1. Solve the system of linear equations: 2x + 3y = 7, x - y = 1\n2. Factor the expression: x² - 5x + 6\n3. Graph the function f(x) = 2x + 3'
  },
  {
    id: 3,
    title: 'Mechanics Basics',
    subject: 'Physics',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-14',
    totalMarks: 60,
    description: 'Newton\'s laws and motion problems.',
    createdDate: '2024-10-20',
    questionPaper: 'mechanics_questions.pdf',
    questions: '1. A car accelerates from rest at 2 m/s². Find velocity after 5 seconds.\n2. Calculate force needed to accelerate 10kg mass at 3 m/s².\n3. Explain Newton\'s third law with examples.'
  },
  {
    id: 4,
    title: 'Periodic Table Quiz',
    subject: 'Chemistry',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-25',
    totalMarks: 60,
    description: 'Identify trends and complete quiz online.',
    createdDate: '2024-11-12',
    questionPaper: 'periodic_table_quiz.pdf',
    questions: '1. Name the noble gases in order of atomic number.\n2. Explain the trend in atomic radius across a period.\n3. Which element has the highest electronegativity?'
  },
  {
    id: 5,
    title: 'Essay Writing Workshop',
    subject: 'English',
    year: '1st Year',
    semester: '2nd Semester',
    dueDate: '2025-01-15',
    totalMarks: 30,
    description: 'Write a 500-word essay on modern technology.',
    createdDate: '2024-11-25',
    questionPaper: 'essay_guidelines.pdf',
    questions: '1. Write a 500-word essay on "The Impact of Social Media on Society".\n2. Include introduction, body paragraphs, and conclusion.\n3. Use proper citations and references.'
  },
  {
    id: 6,
    title: 'Microeconomics Basics',
    subject: 'Economics',
    year: '1st Year',
    semester: '2nd Semester',
    dueDate: '2025-01-20',
    totalMarks: 70,
    description: 'Supply and demand analysis problems.',
    createdDate: '2024-11-28',
    questionPaper: 'microeconomics_questions.pdf',
    questions: '1. Draw supply and demand curves for coffee market.\n2. Calculate equilibrium price and quantity.\n3. Analyze effect of price ceiling on market.'
  },
  
  // 2nd Year Assignments
  {
    id: 7,
    title: 'Data Structures Implementation',
    subject: 'Computer Science',
    year: '2nd Year',
    semester: '1st Semester',
    dueDate: '2024-12-18',
    totalMarks: 80,
    description: 'Implement stacks, queues, and linked lists.',
    createdDate: '2024-10-25',
    questionPaper: 'data_structures_questions.pdf',
    questions: '1. Implement a stack using arrays in C++.\n2. Write a function to reverse a linked list.\n3. Create a queue using two stacks.'
  },
  {
    id: 8,
    title: 'Linear Algebra Matrix Problems',
    subject: 'Mathematics',
    year: '2nd Year',
    semester: '2nd Semester',
    dueDate: '2024-12-20',
    totalMarks: 90,
    description: 'Solve LU decomposition and eigenvalues.',
    createdDate: '2024-11-08',
    questionPaper: 'matrix_problems.pdf',
    questions: '1. Find eigenvalues and eigenvectors of given matrix.\n2. Perform LU decomposition of 3x3 matrix.\n3. Solve system using matrix inversion.'
  },
  {
    id: 9,
    title: 'Thermodynamics Lab Report',
    subject: 'Physics',
    year: '2nd Year',
    semester: '1st Semester',
    dueDate: '2024-12-22',
    totalMarks: 75,
    description: 'Analyze heat engine efficiency experiments.',
    createdDate: '2024-11-10',
    questionPaper: 'thermodynamics_lab.pdf',
    questions: '1. Calculate efficiency of Carnot engine.\n2. Analyze P-V diagram for ideal gas cycle.\n3. Explain second law of thermodynamics.'
  },
  {
    id: 10,
    title: 'Organic Chemistry Reactions',
    subject: 'Chemistry',
    year: '2nd Year',
    semester: '2nd Semester',
    dueDate: '2025-01-25',
    totalMarks: 85,
    description: 'Mechanism and stereochemistry problems.',
    createdDate: '2024-12-01',
    questionPaper: 'organic_reactions.pdf',
    questions: '1. Draw mechanism for SN2 reaction.\n2. Explain stereochemistry of elimination reactions.\n3. Identify products of aldol condensation.'
  },

  // 3rd Year Assignments
  {
    id: 11,
    title: 'OS Scheduling Algorithms',
    subject: 'Computer Science',
    year: '3rd Year',
    semester: '1st Semester',
    dueDate: '2024-12-15',
    totalMarks: 100,
    description: 'Implement FCFS and Round Robin in Python.',
    createdDate: '2024-11-01',
    questionPaper: 'os_scheduling.pdf',
    questions: '1. Implement FCFS scheduling algorithm.\n2. Compare FCFS with Round Robin scheduling.\n3. Calculate average waiting time for given process set.'
  },
  {
    id: 12,
    title: 'Advanced Calculus',
    subject: 'Mathematics',
    year: '3rd Year',
    semester: '2nd Semester',
    dueDate: '2025-02-10',
    totalMarks: 95,
    description: 'Multiple integrals and vector calculus.',
    createdDate: '2024-12-05',
    questionPaper: 'advanced_calculus.pdf',
    questions: '1. Evaluate double integral over given region.\n2. Calculate divergence and curl of vector field.\n3. Apply Green\'s theorem to solve line integral.'
  },
  {
    id: 13,
    title: 'Quantum Mechanics Problems',
    subject: 'Physics',
    year: '3rd Year',
    semester: '1st Semester',
    dueDate: '2024-12-28',
    totalMarks: 120,
    description: 'Schrödinger equation applications.',
    createdDate: '2024-11-15',
    questionPaper: 'quantum_mechanics.pdf',
    questions: '1. Solve Schrödinger equation for particle in a box.\n2. Calculate probability of finding electron in given region.\n3. Explain wave-particle duality with examples.'
  },

  // 4th Year Assignments
  {
    id: 14,
    title: 'Machine Learning Project',
    subject: 'Computer Science',
    year: '4th Year',
    semester: '1st Semester',
    dueDate: '2025-01-30',
    totalMarks: 150,
    description: 'Build a classification model using TensorFlow.',
    createdDate: '2024-11-20',
    questionPaper: 'ml_project_requirements.pdf',
    questions: '1. Build a neural network for image classification.\n2. Compare different optimization algorithms.\n3. Evaluate model performance using cross-validation.'
  },
  {
    id: 15,
    title: 'Research Methodology',
    subject: 'English',
    year: '4th Year',
    semester: '2nd Semester',
    dueDate: '2025-03-15',
    totalMarks: 100,
    description: 'Literature review and thesis proposal.',
    createdDate: '2024-12-10',
    questionPaper: 'research_methodology.pdf',
    questions: '1. Conduct literature review on chosen topic.\n2. Write research proposal with methodology.\n3. Present findings in academic format.'
  }
];

// Enhanced submissions data with more entries
const submissionsDemo = [
  // 1st Year Submissions
  {
    id: 1,
    assignmentId: 1,
    studentName: 'Ravi Kumar',
    studentId: 'CS101',
    subject: 'Computer Science',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-08',
    status: 'Graded',
    score: 45,
    maxScore: 50,
    feedback: 'Good understanding of basic concepts.',
    fileName: 'intro_programming.py'
  },
  {
    id: 2,
    assignmentId: 2,
    studentName: 'Priya Sharma',
    studentId: 'MT101',
    subject: 'Mathematics',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-10',
    status: 'Submitted',
    score: null,
    maxScore: 40,
    feedback: '',
    fileName: 'algebra_solutions.pdf'
  },
  {
    id: 3,
    assignmentId: 3,
    studentName: 'Amit Singh',
    studentId: 'PH101',
    subject: 'Physics',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-12',
    status: 'Graded',
    score: 52,
    maxScore: 60,
    feedback: 'Clear problem-solving approach.',
    fileName: 'mechanics_problems.pdf'
  },
  {
    id: 4,
    assignmentId: 4,
    studentName: 'Rahul Sen',
    studentId: 'CH045',
    subject: 'Chemistry',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-24',
    status: 'Pending Review',
    score: null,
    maxScore: 60,
    feedback: '',
    fileName: 'periodic_quiz.docx'
  },
  {
    id: 5,
    assignmentId: 5,
    studentName: 'Sneha Patel',
    studentId: 'EN101',
    subject: 'English',
    year: '1st Year',
    semester: '2nd Semester',
    submittedDate: '2025-01-12',
    status: 'Submitted',
    score: null,
    maxScore: 30,
    feedback: '',
    fileName: 'technology_essay.docx'
  },
  {
    id: 6,
    assignmentId: 6,
    studentName: 'Karan Mehta',
    studentId: 'EC101',
    subject: 'Economics',
    year: '1st Year',
    semester: '2nd Semester',
    submittedDate: '2025-01-18',
    status: 'Graded',
    score: 62,
    maxScore: 70,
    feedback: 'Good grasp of supply-demand concepts.',
    fileName: 'microeconomics.pdf'
  },

  // 2nd Year Submissions
  {
    id: 7,
    assignmentId: 7,
    studentName: 'Vikash Yadav',
    studentId: 'CS201',
    subject: 'Computer Science',
    year: '2nd Year',
    semester: '1st Semester',
    submittedDate: '2024-12-16',
    status: 'Graded',
    score: 72,
    maxScore: 80,
    feedback: 'Well-implemented data structures.',
    fileName: 'data_structures.cpp'
  },
  {
    id: 8,
    assignmentId: 8,
    studentName: 'Maya Rao',
    studentId: 'MT122',
    subject: 'Mathematics',
    year: '2nd Year',
    semester: '2nd Semester',
    submittedDate: '2024-12-19',
    status: 'Submitted',
    score: null,
    maxScore: 90,
    feedback: '',
    fileName: 'matrix_report.pdf'
  },
  {
    id: 9,
    assignmentId: 9,
    studentName: 'Rohit Gupta',
    studentId: 'PH201',
    subject: 'Physics',
    year: '2nd Year',
    semester: '1st Semester',
    submittedDate: '2024-12-20',
    status: 'Graded',
    score: 68,
    maxScore: 75,
    feedback: 'Accurate calculations and good analysis.',
    fileName: 'thermo_lab.pdf'
  },
  {
    id: 10,
    assignmentId: 10,
    studentName: 'Anita Joshi',
    studentId: 'CH201',
    subject: 'Chemistry',
    year: '2nd Year',
    semester: '2nd Semester',
    submittedDate: '2025-01-22',
    status: 'Submitted',
    score: null,
    maxScore: 85,
    feedback: '',
    fileName: 'organic_mechanisms.pdf'
  },

  // 3rd Year Submissions
  {
    id: 11,
    assignmentId: 11,
    studentName: 'Arjun Patel',
    studentId: 'CS203',
    subject: 'Computer Science',
    year: '3rd Year',
    semester: '1st Semester',
    submittedDate: '2024-12-12',
    status: 'Graded',
    score: 93,
    maxScore: 100,
    feedback: 'Correct implementation, well-commented.',
    fileName: 'scheduling.py'
  },
  {
    id: 12,
    assignmentId: 12,
    studentName: 'Deepika Verma',
    studentId: 'MT301',
    subject: 'Mathematics',
    year: '3rd Year',
    semester: '2nd Semester',
    submittedDate: '2025-02-08',
    status: 'Submitted',
    score: null,
    maxScore: 95,
    feedback: '',
    fileName: 'advanced_calculus.pdf'
  },
  {
    id: 13,
    assignmentId: 13,
    studentName: 'Suresh Kumar',
    studentId: 'PH301',
    subject: 'Physics',
    year: '3rd Year',
    semester: '1st Semester',
    submittedDate: '2024-12-26',
    status: 'Graded',
    score: 108,
    maxScore: 120,
    feedback: 'Excellent understanding of quantum concepts.',
    fileName: 'quantum_mechanics.pdf'
  },

  // 4th Year Submissions
  {
    id: 14,
    assignmentId: 14,
    studentName: 'Neha Agarwal',
    studentId: 'CS401',
    subject: 'Computer Science',
    year: '4th Year',
    semester: '1st Semester',
    submittedDate: '2025-01-28',
    status: 'Submitted',
    score: null,
    maxScore: 150,
    feedback: '',
    fileName: 'ml_project.zip'
  },
  {
    id: 15,
    assignmentId: 15,
    studentName: 'Rajesh Tiwari',
    studentId: 'EN401',
    subject: 'English',
    year: '4th Year',
    semester: '2nd Semester',
    submittedDate: '2025-03-12',
    status: 'Submitted',
    score: null,
    maxScore: 100,
    feedback: '',
    fileName: 'research_proposal.docx'
  }
];

function getStatusColor(status) {
  if (status === 'Submitted') return 'bg-blue-100 text-blue-800';
  if (status === 'Graded') return 'bg-green-100 text-green-800';
  if (status === 'Pending Review') return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
}

// Helper function to get year order for sorting
function getYearOrder(year) {
  const yearMap = { '1st Year': 1, '2nd Year': 2, '3rd Year': 3, '4th Year': 4 };
  return yearMap[year] || 0;
}

// Helper function to get semester order for sorting
function getSemesterOrder(semester) {
  const semesterMap = { '1st Semester': 1, '2nd Semester': 2 };
  return semesterMap[semester] || 0;
}

const Assignment = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [viewingAssignment, setViewingAssignment] = useState(null);

  const [assignments, setAssignments] = useState(assignmentsDemo);
  const [submissions, setSubmissions] = useState(submissionsDemo);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    year: '',
    semester: '',
    dueDate: '',
    totalMarks: '',
    description: '',
    questionPaper: null,
    questions: ''
  });

  // Enhanced filtering and sorting logic
  const filteredSubmissions = submissions
    .filter(submission =>
      (!selectedSubject || submission.subject === selectedSubject) &&
      (!selectedYear || submission.year === selectedYear) &&
      (!selectedSemester || submission.semester === selectedSemester)
    )
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

  const filteredAssignments = assignments
    .filter(assignment =>
      (!selectedSubject || assignment.subject === selectedSubject) &&
      (!selectedYear || assignment.year === selectedYear) &&
      (!selectedSemester || assignment.semester === selectedSemester)
    )
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

  function handleAddAssignment() {
    if (newAssignment.title && newAssignment.subject && newAssignment.year && newAssignment.semester) {
      const assignment = {
        ...newAssignment,
        id: assignments.length + 1,
        totalMarks: parseInt(newAssignment.totalMarks),
        createdDate: new Date().toISOString().split('T')[0],
        questionPaper: newAssignment.questionPaper ? newAssignment.questionPaper.name : null
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({
        title: '',
        subject: '',
        year: '',
        semester: '',
        dueDate: '',
        totalMarks: '',
        description: '',
        questionPaper: null,
        questions: ''
      });
      setShowAddForm(false);
    }
  }

  function handleEditAssignment(assignment) {
    setEditingAssignment({ ...assignment });
  }

  function handleSaveEdit() {
    setAssignments(assignments.map(a =>
      a.id === editingAssignment.id ? editingAssignment : a
    ));
    setEditingAssignment(null);
  }

  function handleScoreUpdate(submissionId, newScore, feedback) {
    setSubmissions(submissions.map(sub =>
      sub.id === submissionId
        ? { ...sub, score: newScore, feedback, status: 'Graded' }
        : sub
    ));
  }

  return (
    <div className="min-h-screen bg--to-br from-blue-50 to-violet-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Top mobile bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setShowSidebar(true)} /> Assignment Dashboard
        </h1>
      </div>

      {/* Side drawer filter for mobile */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
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

      <div className="p-4 md:max-w-8xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-t-lg p-6 text-white flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">HOD Assignment Manager</h1>
            <p className="mt-1 text-blue-100">Manage assignments and student submissions</p>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <label>
              <select 
                value={selectedYear} 
                onChange={e => setSelectedYear(e.target.value)}
                className="px-2 py-1 rounded text-black font-medium"
              >
                <option value="">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>
            <label>
              <select 
                value={selectedSemester} 
                onChange={e => setSelectedSemester(e.target.value)}
                className="px-2 py-1 rounded text-black font-medium"
              >
                <option value="">All Semesters</option>
                {semesters.map(se => <option key={se} value={se}>{se}</option>)}
              </select>
            </label>
            <label>
              <select 
                value={selectedSubject} 
                onChange={e => setSelectedSubject(e.target.value)}
                className="px-2 py-1 rounded text-black font-medium"
              >
                <option value="">All Subjects</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 font-medium rounded-t-lg mr-2 transition-colors ${
              activeTab === 'submissions'
                ? 'bg-white text-blue-700 border-b-2 border-blue-700'
                : 'bg-blue-50 text-blue-400 hover:bg-white'
            }`}
          >
            Student Submissions ({filteredSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 font-medium rounded-t-lg mr-2 transition-colors ${
              activeTab === 'assignments'
                ? 'bg-white text-blue-700 border-b-2 border-blue-700'
                : 'bg-blue-50 text-blue-400 hover:bg-white'
            }`}
          >
            Manage Assignments ({filteredAssignments.length})
          </button>
        </div>

        {/* Content */}
        <div className="pt-4">
          {/* Submissions */}
          {activeTab === 'submissions' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSubmissions.map(submission => (
                <div key={submission.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{submission.studentName}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">ID: {submission.studentId}</div>
                    <div className="grid grid-cols-1 gap-1 text-xs text-gray-600 dark:text-gray-300">
                      <div><strong>Subject:</strong> {submission.subject}</div>
                      <div><strong>Year:</strong> {submission.year}</div>
                      <div><strong>Semester:</strong> {submission.semester}</div>
                      <div><strong>Submitted:</strong> {submission.submittedDate}</div>
                    </div>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    {submission.score !== null && (
                      <div className="mt-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-blue-700 text-sm">Score: {submission.score}/{submission.maxScore}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setViewingSubmission(submission)}
                    className="mt-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" /> View Details
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Assignments */}
          {activeTab === 'assignments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Assignment Management</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Assignment
                </button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAssignments.map(assignment => (
                  <div key={assignment.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-5">
                    {editingAssignment?.id === assignment.id ? (
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
                          value={editingAssignment.title}
                          onChange={e => setEditingAssignment({...editingAssignment, title: e.target.value})}
                          placeholder="Title" 
                        />
                        <select 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                          value={editingAssignment.subject}
                          onChange={e => setEditingAssignment({...editingAssignment, subject: e.target.value})}
                        >
                          <option value="">Subject</option>
                          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                          value={editingAssignment.year}
                          onChange={e => setEditingAssignment({...editingAssignment, year: e.target.value})}
                        >
                          <option value="">Year</option>
                          {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <select 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                          value={editingAssignment.semester}
                          onChange={e => setEditingAssignment({...editingAssignment, semester: e.target.value})}
                        >
                          <option value="">Semester</option>
                          {semesters.map(se => <option key={se} value={se}>{se}</option>)}
                        </select>
                        <input 
                          type="date" 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                          value={editingAssignment.dueDate}
                          onChange={e => setEditingAssignment({...editingAssignment, dueDate: e.target.value})} 
                        />
                        <input 
                          type="number" 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                          value={editingAssignment.totalMarks}
                          onChange={e => setEditingAssignment({...editingAssignment, totalMarks: parseInt(e.target.value)})}
                          placeholder="Total Marks" 
                        />
                        <textarea 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
                          rows={2}
                          value={editingAssignment.description}
                          onChange={e => setEditingAssignment({...editingAssignment, description: e.target.value})}
                          placeholder="Description"
                        />
                        <textarea 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
                          rows={3}
                          value={editingAssignment.questions || ''}
                          onChange={e => setEditingAssignment({...editingAssignment, questions: e.target.value})}
                          placeholder="Questions (optional)"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSaveEdit}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1 text-sm"
                          >
                            <Save className="w-4 h-4" /> Save
                          </button>
                          <button 
                            onClick={() => setEditingAssignment(null)}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-1 text-sm"
                          >
                            <X className="w-4 h-4" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{assignment.title}</h3>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => setViewingAssignment(assignment)}
                              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1 text-xs"
                            >
                              <Eye className="w-3 h-3" /> View
                            </button>
                            <button 
                              onClick={() => handleEditAssignment(assignment)}
                              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1 text-xs"
                            >
                              <Edit className="w-3 h-3" /> Edit
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-xs text-gray-700 dark:text-gray-300 mb-2">
                          <div><strong>Subject:</strong> {assignment.subject}</div>
                          <div><strong>Year:</strong> {assignment.year}</div>
                          <div><strong>Semester:</strong> {assignment.semester}</div>
                          <div><strong>Due:</strong> {assignment.dueDate}</div>
                        </div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 mt-1">{assignment.description}</div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-blue-600 font-medium">
                            Total Marks: {assignment.totalMarks}
                          </div>
                          {assignment.questionPaper && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <File className="w-3 h-3" />
                              <span>Has Paper</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Assignment Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Assignment</h2>
            <div className="space-y-3">
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={newAssignment.title}
                onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
                placeholder="Assignment Title" 
              />
              <select 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={newAssignment.subject}
                onChange={e => setNewAssignment({...newAssignment, subject: e.target.value})}
              >
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={newAssignment.year}
                onChange={e => setNewAssignment({...newAssignment, year: e.target.value})}
              >
                <option value="">Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={newAssignment.semester}
                onChange={e => setNewAssignment({...newAssignment, semester: e.target.value})}
              >
                <option value="">Select Semester</option>
                {semesters.map(se => <option key={se} value={se}>{se}</option>)}
              </select>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={newAssignment.dueDate}
                onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})} 
                title="Due Date"
              />
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={newAssignment.totalMarks}
                onChange={e => setNewAssignment({...newAssignment, totalMarks: e.target.value})}
                placeholder="Total Marks" 
                min="1"
              />
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                rows={3}
                value={newAssignment.description}
                onChange={e => setNewAssignment({...newAssignment, description: e.target.value})}
                placeholder="Assignment Description"
              />
              
              {/* Question Paper Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Question Paper (Optional)
                </label>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx,.txt"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200"
                  onChange={e => setNewAssignment({...newAssignment, questionPaper: e.target.files[0]})}
                />
                {newAssignment.questionPaper && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <File className="w-3 h-3" />
                    Selected: {newAssignment.questionPaper.name}
                  </p>
                )}
              </div>

              {/* Questions Text Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Assignment Questions (Optional)
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                  rows={5}
                  value={newAssignment.questions}
                  onChange={e => setNewAssignment({...newAssignment, questions: e.target.value})}
                  placeholder="Enter questions here (one per line)&#10;Example:&#10;1. What is the capital of France?&#10;2. Explain the concept of inheritance in OOP.&#10;3. Calculate the derivative of f(x) = x² + 2x + 1"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6 justify-end">
              <button 
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button 
                onClick={handleAddAssignment}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
                disabled={!newAssignment.title || !newAssignment.subject || !newAssignment.year || !newAssignment.semester}
              >
                <Plus className="w-4 h-4" /> Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Details Modal */}
      {viewingAssignment && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Assignment Details
              </h2>
              <button 
                onClick={() => setViewingAssignment(null)} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{viewingAssignment.title}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><strong>Subject:</strong> {viewingAssignment.subject}</div>
                  <div><strong>Year:</strong> {viewingAssignment.year}</div>
                  <div><strong>Semester:</strong> {viewingAssignment.semester}</div>
                  <div><strong>Due Date:</strong> {viewingAssignment.dueDate}</div>
                  <div><strong>Total Marks:</strong> {viewingAssignment.totalMarks}</div>
                  <div><strong>Created:</strong> {viewingAssignment.createdDate}</div>
                </div>
              </div>

              {viewingAssignment.description && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded p-3">
                    {viewingAssignment.description}
                  </p>
                </div>
              )}

              {viewingAssignment.questionPaper && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <File className="w-4 h-4" />
                    Question Paper
                  </h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <File className="w-4 h-4" />
                      <span className="text-sm">{viewingAssignment.questionPaper}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm underline">
                      Download
                    </button>
                  </div>
                </div>
              )}

              {viewingAssignment.questions && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Questions
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                    <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
                      {viewingAssignment.questions}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submission Details Modal */}
      {viewingSubmission && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Submission Details</h2>
              <button 
                onClick={() => setViewingSubmission(null)} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm mb-2 text-gray-700 dark:text-gray-300">
                <div><strong>Student:</strong> {viewingSubmission.studentName}</div>
                <div><strong>ID:</strong> {viewingSubmission.studentId}</div>
                <div><strong>Subject:</strong> {viewingSubmission.subject}</div>
                <div><strong>File:</strong> {viewingSubmission.fileName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Score</label>
                <input 
                  type="number"
                  defaultValue={viewingSubmission.score || ''}
                  max={viewingSubmission.maxScore}
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder={`Enter score out of ${viewingSubmission.maxScore}`}
                  onBlur={e => {
                    const score = parseInt(e.target.value);
                    const feedback = document.getElementById('feedback-textarea').value;
                    if (score >= 0 && score <= viewingSubmission.maxScore) {
                      handleScoreUpdate(viewingSubmission.id, score, feedback);
                    }
                  }} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Feedback</label>
                <textarea
                  id="feedback-textarea"
                  defaultValue={viewingSubmission.feedback}
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows="3"
                  placeholder="Feedback for the student"
                  onBlur={e => {
                    const feedback = e.target.value;
                    const scoreInput = document.querySelector('input[type="number"]');
                    const score = parseInt(scoreInput.value);
                    if (!isNaN(score) && score >= 0 && score <= viewingSubmission.maxScore) {
                      handleScoreUpdate(viewingSubmission.id, score, feedback);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment;