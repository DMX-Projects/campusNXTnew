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

const subjects = [
  'Computer Programming', 'Data Structures and Algorithms', 'Machine Learning',
  'Artificial Intelligence', 'Database Management Systems', 'Operating Systems',
  'Computer Networks', 'Web Technologies', 'Digital Electronics',
  'Communication Systems', 'VLSI Design', 'Embedded Systems',
  'Information Security', 'Cloud Computing', 'Research Methodology'
];

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const semesters = ['1st Semester', '2nd Semester'];

const programs = ['B.Tech CSE', 'M.Tech CSE', 'B.Tech IT', 'M.Tech IT', 'B.Tech ECE', 'M.Tech ECE'];

// Updated assignments with subject, title, description mapped properly
const assignmentsDemo = [
  {
    id: 1,
    title: 'Basics of C Programming',
    subject: 'Computer Programming',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-10',
    totalMarks: 50,
    description: 'Introduction to variables, loops, and control structures in C.',
    createdDate: '2024-10-15',
    questionPaper: 'c_programming_basics.pdf',
    questions: '1. Write a program to calculate factorial.\n2. Implement Fibonacci series.\n3. Demonstrate use of switch-case.'
  },
  {
    id: 2,
    title: 'Advanced Trees and Graphs',
    subject: 'Data Structures and Algorithms',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-12',
    totalMarks: 100,
    description: 'Implementation and analysis of advanced trees and graph algorithms.',
    createdDate: '2024-10-18',
    questionPaper: 'ds_algorithms.pdf',
    questions: '1. Implement AVL Tree.\n2. Perform BFS and DFS on a graph.\n3. Solve shortest path using Dijkstra\'s algorithm.'
  },
  {
    id: 3,
    title: 'Supervised Learning Models',
    subject: 'Machine Learning',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-12',
    totalMarks: 40,
    description: 'Introduction to regression and classification models.',
    createdDate: '2024-10-18',
    questionPaper: 'ml_supervised.pdf',
    questions: '1. Implement linear regression.\n2. Build a decision tree classifier.\n3. Evaluate accuracy using confusion matrix.'
  },
  {
    id: 4,
    title: 'AI Problem Solving',
    subject: 'Artificial Intelligence',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-25',
    totalMarks: 60,
    description: 'Solve search-based and reasoning problems using AI techniques.',
    createdDate: '2024-11-12',
    questionPaper: 'ai_problems.pdf',
    questions: '1. Implement A* search.\n2. Solve 8-puzzle using BFS.\n3. Write knowledge representation using Prolog.'
  },
  {
    id: 5,
    title: 'Relational Databases',
    subject: 'Database Management Systems',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '2nd Semester',
    dueDate: '2025-01-20',
    totalMarks: 70,
    description: 'Normalization, indexing, and query optimization problems.',
    createdDate: '2024-11-28',
    questionPaper: 'dbms_assignment.pdf',
    questions: '1. Normalize to 3NF.\n2. Write SQL joins.\n3. Explain transaction isolation levels.'
  },
  {
    id: 6,
    title: 'Process Scheduling',
    subject: 'Operating Systems',
    program: 'M.Tech CSE',
    year: '2nd Year',
    semester: '2nd Semester',
    dueDate: '2024-12-20',
    totalMarks: 90,
    description: 'Design and analyze CPU scheduling algorithms.',
    createdDate: '2024-11-08',
    questionPaper: 'os_scheduling.pdf',
    questions: '1. Implement FCFS and SJF.\n2. Compare with Round Robin.\n3. Calculate average waiting times.'
  },
  {
    id: 7,
    title: 'Network Layer Protocols',
    subject: 'Computer Networks',
    program: 'B.Tech ECE',
    year: '2nd Year',
    semester: '1st Semester',
    dueDate: '2024-12-22',
    totalMarks: 75,
    description: 'Study of TCP/IP, routing, and switching protocols.',
    createdDate: '2024-11-10',
    questionPaper: 'networks_assignment.pdf',
    questions: '1. Explain TCP vs UDP.\n2. Implement distance vector routing.\n3. Analyze IP packet fragmentation.'
  },
  {
    id: 8,
    title: 'Responsive Web Development',
    subject: 'Web Technologies',
    program: 'M.Tech CSE',
    year: '2nd Year',
    semester: '2nd Semester',
    dueDate: '2025-01-25',
    totalMarks: 85,
    description: 'Front-end and back-end development with modern frameworks.',
    createdDate: '2024-12-01',
    questionPaper: 'web_tech.pdf',
    questions: '1. Build responsive HTML/CSS layout.\n2. Create API with Node.js.\n3. Implement CRUD in React.'
  },
  {
    id: 9,
    title: 'Boolean Algebra and Logic',
    subject: 'Digital Electronics',
    program: 'B.Tech CSE',
    year: '3rd Year',
    semester: '1st Semester',
    dueDate: '2024-12-15',
    totalMarks: 100,
    description: 'Simplify Boolean expressions and design combinational circuits.',
    createdDate: '2024-11-01',
    questionPaper: 'digital_logic.pdf',
    questions: '1. Minimize Boolean expressions.\n2. Design half adder and full adder.\n3. Implement 4:1 multiplexer.'
  },
  {
    id: 10,
    title: 'Wireless Communication Systems',
    subject: 'Communication Systems',
    program: 'M.Tech ECE',
    year: '3rd Year',
    semester: '1st Semester',
    dueDate: '2024-12-28',
    totalMarks: 120,
    description: 'Study of modulation, multiplexing, and wireless protocols.',
    createdDate: '2024-11-15',
    questionPaper: 'communication_systems.pdf',
    questions: '1. Explain frequency modulation.\n2. Discuss TDMA vs FDMA.\n3. Analyze LTE architecture.'
  },
  {
    id: 11,
    title: 'Cloud Security Models',
    subject: 'Cloud Computing',
    program: 'M.Tech CSE',
    year: '4th Year',
    semester: '1st Semester',
    dueDate: '2025-01-30',
    totalMarks: 150,
    description: 'Secure cloud infrastructure and services.',
    createdDate: '2024-11-20',
    questionPaper: 'cloud_security.pdf',
    questions: '1. Explain SaaS, PaaS, IaaS.\n2. Implement identity management.\n3. Discuss data privacy in cloud.'
  },
  {
    id: 12,
    title: 'Thesis Writing & Research Ethics',
    subject: 'Research Methodology',
    program: 'B.Tech CSE',
    year: '4th Year',
    semester: '2nd Semester',
    dueDate: '2025-03-15',
    totalMarks: 100,
    description: 'Focus on academic research writing, ethics, and proposal creation.',
    createdDate: '2024-12-10',
    questionPaper: 'research_methodology.pdf',
    questions: '1. Write a literature review.\n2. Explain plagiarism and ethics.\n3. Draft a research proposal.'
  }
];

// Submissions also updated with corrected subjects
const submissionsDemo = [
  {
    id: 1,
    assignmentId: 1,
    studentName: 'Ravi Kumar',
    studentId: 'CS101',
    subject: 'Computer Programming',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-08',
    status: 'Graded',
    score: 45,
    maxScore: 50,
    feedback: 'Good coding practices and logic.',
    fileName: 'c_programming.c'
  },
  {
    id: 2,
    assignmentId: 2,
    studentName: 'Priya Sharma',
    studentId: 'MCS101',
    subject: 'Data Structures and Algorithms',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-10',
    status: 'Graded',
    score: 92,
    maxScore: 100,
    feedback: 'Efficient graph algorithms.',
    fileName: 'ds_algorithms.cpp'
  },
  {
    id: 3,
    assignmentId: 3,
    studentName: 'Amit Singh',
    studentId: 'CS102',
    subject: 'Machine Learning',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-12',
    status: 'Graded',
    score: 35,
    maxScore: 40,
    feedback: 'Well-structured ML models.',
    fileName: 'ml_supervised.ipynb'
  },
  {
    id: 4,
    assignmentId: 4,
    studentName: 'Neha Gupta',
    studentId: 'SC101',
    subject: 'Artificial Intelligence',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-23',
    status: 'Graded',
    score: 55,
    maxScore: 60,
    feedback: 'Good use of search algorithms.',
    fileName: 'ai_problems.pl'
  },
  {
    id: 5,
    assignmentId: 5,
    studentName: 'Karan Mehta',
    studentId: 'BCA101',
    subject: 'Database Management Systems',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '2nd Semester',
    submittedDate: '2025-01-18',
    status: 'Graded',
    score: 62,
    maxScore: 70,
    feedback: 'Correct normalization and queries.',
    fileName: 'dbms_assignment.sql'
  },
  {
    id: 6,
    assignmentId: 6,
    studentName: 'Rajesh Kumar',
    studentId: 'MCS201',
    subject: 'Operating Systems',
    program: 'M.Tech CSE',
    year: '2nd Year',
    semester: '2nd Semester',
    submittedDate: '2024-12-18',
    status: 'Graded',
    score: 85,
    maxScore: 90,
    feedback: 'Accurate scheduling algorithm implementation.',
    fileName: 'os_scheduling.py'
  },
  {
    id: 7,
    assignmentId: 7,
    studentName: 'Vikash Yadav',
    studentId: 'ECE201',
    subject: 'Computer Networks',
    program: 'B.Tech ECE',
    year: '2nd Year',
    semester: '1st Semester',
    submittedDate: '2024-12-20',
    status: 'Graded',
    score: 68,
    maxScore: 75,
    feedback: 'Good explanation of routing protocols.',
    fileName: 'network_layer.docx'
  },
  {
    id: 8,
    assignmentId: 8,
    studentName: 'Anita Verma',
    studentId: 'MSC201',
    subject: 'Web Technologies',
    program: 'M.Tech CSE',
    year: '2nd Year',
    semester: '2nd Semester',
    submittedDate: '2025-01-23',
    status: 'Graded',
    score: 78,
    maxScore: 85,
    feedback: 'Responsive and functional web app.',
    fileName: 'web_project.zip'
  },
  {
    id: 9,
    assignmentId: 9,
    studentName: 'Arjun Patel',
    studentId: 'CS301',
    subject: 'Digital Electronics',
    program: 'B.Tech CSE',
    year: '3rd Year',
    semester: '1st Semester',
    submittedDate: '2024-12-12',
    status: 'Graded',
    score: 93,
    maxScore: 100,
    feedback: 'Perfect circuit design and simplification.',
    fileName: 'digital_logic.vhd'
  },
  {
    id: 10,
    assignmentId: 10,
    studentName: 'Suresh Kumar',
    studentId: 'MECE301',
    subject: 'Communication Systems',
    program: 'M.Tech ECE',
    year: '3rd Year',
    semester: '1st Semester',
    submittedDate: '2024-12-26',
    status: 'Graded',
    score: 108,
    maxScore: 120,
    feedback: 'Excellent explanation of modulation.',
    fileName: 'communication_systems.pdf'
  },
  {
    id: 11,
    assignmentId: 11,
    studentName: 'Deepak Joshi',
    studentId: 'MCS401',
    subject: 'Cloud Computing',
    program: 'M.Tech CSE',
    year: '4th Year',
    semester: '1st Semester',
    submittedDate: '2025-01-28',
    status: 'Submitted',
    score: null,
    maxScore: 150,
    feedback: null,
    fileName: 'cloud_security.docx'
  },
  {
    id: 12,
    assignmentId: 12,
    studentName: 'Sonia Singh',
    studentId: 'MCA401',
    subject: 'Research Methodology',
    program: 'B.Tech CSE',
    year: '4th Year',
    semester: '2nd Semester',
    submittedDate: '2025-03-10',
    status: 'Pending Review',
    score: null,
    maxScore: 100,
    feedback: null,
    fileName: 'research_proposal.pdf'
  }
];

const tabs = ['submissions', 'assignments'];

function getStatusColor(status) {
  if (status === 'Submitted') return 'bg-blue-100 text-blue-800';
  if (status === 'Graded') return 'bg-green-100 text-green-800';
  if (status === 'Pending Review') return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
}

function getYearOrder(year) {
  const yearMap = { '1st Year': 1, '2nd Year': 2, '3rd Year': 3, '4th Year': 4 };
  return yearMap[year] || 0;
}

function getSemesterOrder(semester) {
  const semesterMap = { '1st Semester': 1, '2nd Semester': 2 };
  return semesterMap[semester] || 0;
}

const Assignment = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
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
    program: '',
    year: '',
    semester: '',
    dueDate: '',
    totalMarks: '',
    description: '',
    questionPaper: null,
    questions: ''
  });

  // Enhanced filtering with program filter
  const filteredSubmissions = submissions
    .filter(submission =>
      (!selectedSubject || submission.subject === selectedSubject) &&
      (!selectedYear || submission.year === selectedYear) &&
      (!selectedSemester || submission.semester === selectedSemester) &&
      (!selectedProgram || submission.program === selectedProgram)
    )
    .sort((a, b) => {
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
      (!selectedSemester || assignment.semester === selectedSemester) &&
      (!selectedProgram || assignment.program === selectedProgram)
    )
    .sort((a, b) => {
      const yearA = getYearOrder(a.year);
      const yearB = getYearOrder(b.year);
      if (yearA !== yearB) return yearA - yearB;
      
      const semesterA = getSemesterOrder(a.semester);
      const semesterB = getSemesterOrder(b.semester);
      if (semesterA !== semesterB) return semesterA - semesterB;
      
      return a.subject.localeCompare(b.subject);
    });

  function handleAddAssignment() {
    if (newAssignment.title && newAssignment.subject && newAssignment.program && newAssignment.year && newAssignment.semester) {
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
        program: '',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Top mobile bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setShowSidebar(true)} /> Online Test Management
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
        {/* Header - Updated to match the image */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-lg p-8 text-white mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Assignment Management</h1>
            <p className="text-lg text-indigo-100">Manage assignments and monitor student performance</p>
          </div>
        </div>

     {/* Filter Dropdowns Section - Updated for proper light/dark mode */}
<div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 p-4 rounded-lg mb-6 shadow-sm">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
      <select 
        value={selectedYear} 
        onChange={e => setSelectedYear(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        <option value="">All Years</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
      <select 
        value={selectedSemester} 
        onChange={e => setSelectedSemester(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        <option value="">All Semesters</option>
        {semesters.map(se => <option key={se} value={se}>{se}</option>)}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program</label>
      <select 
        value={selectedProgram} 
        onChange={e => setSelectedProgram(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        <option value="">All Programs</option>
        {programs.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
      <select 
        value={selectedSubject} 
        onChange={e => setSelectedSubject(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        <option value="">All Subjects</option>
        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  </div>
</div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-3 font-medium text-md border-b-2 transition-colors ${
              activeTab === 'submissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Test Submissions ({filteredSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-6 py-3 font-medium text-md border-b-2 transition-colors ${
              activeTab === 'assignments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Tests ({filteredAssignments.length})
          </button>
        </div>

        {/* Content */}
        <div>
          {/* Submissions with Program display */}
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
                      <div><strong>Program:</strong> {submission.program}</div>
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

          {/* Assignments with Program display and Edit functionality */}
          {activeTab === 'assignments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Test Management</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Test
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
                          value={editingAssignment.program || ''}
                          onChange={e => setEditingAssignment({...editingAssignment, program: e.target.value})}
                        >
                          <option value="">Program</option>
                          {programs.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        
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
                          <div><strong>Program:</strong> {assignment.program}</div>
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

      {/* Add Assignment Modal - Updated with Program field */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Test</h2>
            <div className="space-y-3">
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={newAssignment.title}
                onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
                placeholder="Test Title" 
              />
              
              <select 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={newAssignment.program}
                onChange={e => setNewAssignment({...newAssignment, program: e.target.value})}
              >
                <option value="">Select Program</option>
                {programs.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              
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
                placeholder="Test Description"
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
                  Test Questions (Optional)
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
                disabled={!newAssignment.title || !newAssignment.subject || !newAssignment.program || !newAssignment.year || !newAssignment.semester}
              >
                <Plus className="w-4 h-4" /> Add Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Details Modal - Updated to show Program */}
      {viewingAssignment && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Test Details
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
                  <div><strong>Program:</strong> {viewingAssignment.program}</div>
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
                <div><strong>Program:</strong> {viewingSubmission.program}</div>
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
